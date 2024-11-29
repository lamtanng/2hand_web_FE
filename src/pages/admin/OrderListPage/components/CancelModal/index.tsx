import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';

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
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleReject = () => {
    processRequest(ReplyStatus.Rejected);
    setIsModalOpen(false);
  };

  const handleApprove = () => {
    processRequest(ReplyStatus.Succeeded);
    setIsModalOpen(false);
  };
  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[70vh] w-1/2 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 mb-2 text-blue-600">
          Cancel Request
        </Typography.Title>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6">
          <Flex className="mb-2">
            <Typography.Paragraph className="m-0 w-1/6">Reason: </Typography.Paragraph>
            <Typography.Paragraph className="m-0">{record?.orderRequest?.reasonID?.name}</Typography.Paragraph>
          </Flex>
          <Flex className="mb-2">
            <Typography.Paragraph className="m-0 w-1/6">Description: </Typography.Paragraph>
            <Typography.Paragraph className="m-0">{record?.orderRequest?.description}</Typography.Paragraph>
          </Flex>
          <Flex vertical gap={'small'} className="mb-6">
            <Typography.Paragraph className="m-0">Reply message: </Typography.Paragraph>
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 3 }}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-6"
            />
          </Flex>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base" onClick={handleReject}>
              Reject
            </Button>
            <Button type="primary" className="px-8 py-5 text-base" onClick={handleApprove}>
              Approve
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
