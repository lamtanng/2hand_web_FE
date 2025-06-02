import { CloseOutlined, ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography, Alert, Space, Avatar } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import './CancelModal.css';

const CancelModal = ({
  isModalOpen,
  setIsModalOpen,
  setDescription,
  record,
  processRequest,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  record: any;
  processRequest: (replyStatus: string) => Promise<void>;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    if (!isProcessing) {
      setIsModalOpen(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await processRequest(ReplyStatus.Rejected);
    setIsProcessing(false);
    setIsModalOpen(false);
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    await processRequest(ReplyStatus.Succeeded);
    setIsProcessing(false);
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20 backdrop-blur-sm' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`cancel-modal max-h-[70vh] w-full max-w-md rounded-xl bg-white p-0 shadow-lg transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `}
      >
        <div className="rounded-t-xl border-b border-blue-100 bg-blue-50 p-6">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="small">
              <ExclamationCircleOutlined className="text-xl text-blue-500" />
              <Typography.Title level={4} className="m-0 text-blue-700">
                Cancel Request
              </Typography.Title>
            </Flex>
            <Button
              type="text"
              onClick={handleClose}
              icon={<CloseOutlined />}
              className="hover:bg-blue-100 hover:text-blue-700"
              disabled={isProcessing}
            />
          </Flex>
        </div>

        <div className="max-h-[calc(70vh-120px)] overflow-y-auto p-6">
          <Alert
            message="Action Required"
            description="A customer has requested to cancel their order. Please review the details and respond accordingly."
            type="info"
            showIcon
            className="mb-4"
          />

          <Space direction="vertical" className="mb-4 w-full">
            <Typography.Text strong>Reason for Cancellation:</Typography.Text>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <Typography.Text>{record?.orderRequest?.reasonID?.name || 'No reason specified'}</Typography.Text>
            </div>
          </Space>

          <Space direction="vertical" className="mb-4 w-full">
            <Typography.Text strong>Customer's Description:</Typography.Text>
            <div className="max-h-32 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-3">
              <Typography.Paragraph className="m-0">
                {record?.orderRequest?.description || 'No description provided'}
              </Typography.Paragraph>
            </div>
          </Space>

          <Space direction="vertical" className="mb-4 w-full">
            <Typography.Text strong>Your Response:</Typography.Text>
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 3 }}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your response to the customer..."
              className="response-textarea"
              disabled={isProcessing}
            />
          </Space>
        </div>

        <div className="rounded-b-xl border-t border-gray-100 bg-gray-50 p-4">
          <Flex justify="end" gap="middle">
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={handleReject}
              disabled={isProcessing}
              loading={isProcessing}
            >
              Reject Request
            </Button>
            <Button
              type="primary"
              className="bg-green-600 hover:bg-green-700"
              icon={<CheckCircleOutlined />}
              onClick={handleApprove}
              disabled={isProcessing}
              loading={isProcessing}
            >
              Approve Cancellation
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
