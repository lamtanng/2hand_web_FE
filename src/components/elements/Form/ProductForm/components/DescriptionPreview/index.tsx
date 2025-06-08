import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Badge, Button, Divider, Flex, Modal, Typography } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

interface DescriptionPreviewProps {
  isOpen: boolean;
  currentDescription: string;
  generatedDescription: string;
  onAccept: () => void;
  onReject: () => void;
  onRegenerate: () => void;
  isGenerating?: boolean;
}

const DescriptionPreview: React.FC<DescriptionPreviewProps> = ({
  isOpen,
  currentDescription,
  generatedDescription,
  onAccept,
  onReject,
  onRegenerate,
  isGenerating = false,
}) => {
  return (
    <Modal
      title={
        <Flex align="center" gap="small">
          <Badge status="processing" className="animate-pulse">
            <EditOutlined className="text-xl text-blue-500" />
          </Badge>
          <Typography.Title level={4} className="!m-0">
            Compare Descriptions
          </Typography.Title>
        </Flex>
      }
      open={isOpen}
      footer={null}
      onCancel={onReject}
      width={1200}
      centered
      className="description-preview-modal"
      style={{
        top: 20,
        paddingBottom: 20,
      }}
      bodyStyle={{
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'hidden',
      }}
    >
      <Divider className="!mb-6 !mt-3" />

      <Flex gap={'large'} justify="space-between" style={{ minHeight: '60vh' }}>
        {/* Left Side - Current Description */}
        <div
          style={{
            width: '100%',
            flexBasis: '47%',
            background: 'rgba(243 244 246 0.5)',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Flex align="center" gap="small" className="mb-4">
            <Typography.Title level={5} style={{ margin: '12px 0' }}>
              Current Description
            </Typography.Title>
          </Flex>
          <div className="h-[calc(100vh-500px)] w-full overflow-y-auto rounded-lg bg-gray-100/50 p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
            <div className="prose max-w-none">
              {currentDescription ? (
                parse(currentDescription)
              ) : (
                <Typography.Text className="text-gray-400" italic>
                  No current description available
                </Typography.Text>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Generated Description */}
        <div
          style={{
            width: '100%',
            flexBasis: '47%',
            background: 'rgba(239 246 255 0.5)',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Flex justify="space-between" align="center" className="mb-4">
            <Flex align="center" gap="small">
              <div className="h-5 w-1 rounded-full bg-blue-600" />
              <Badge status="processing" />
              <Typography.Title level={5} style={{ margin: '12px 0', color: 'rgb(37 99 235)' }}>
                Generated Description
              </Typography.Title>
            </Flex>
            <Button
              type="primary"
              icon={isGenerating ? <LoadingOutlined /> : <ReloadOutlined />}
              onClick={onRegenerate}
              disabled={isGenerating}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Regenerate
            </Button>
          </Flex>
          <div className="h-[calc(100vh-500px)] w-full overflow-y-auto rounded-lg bg-blue-100/50 p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
            {isGenerating ? (
              <Flex vertical className="h-full items-center justify-center" gap="middle">
                <Typography.Text className="text-gray-500">Generating content...</Typography.Text>
              </Flex>
            ) : (
              <div className="prose max-w-none">
                {generatedDescription ? (
                  parse(generatedDescription)
                ) : (
                  <Typography.Text className="text-gray-400" italic>
                    No generated description available
                  </Typography.Text>
                )}
              </div>
            )}
          </div>
        </div>
      </Flex>

      <Divider className="!my-4" />

      {/* Action Buttons */}
      <Flex justify="end" gap="middle">
        <Button
          size="large"
          icon={<CloseOutlined />}
          onClick={onReject}
          className="min-w-[140px] transition-all duration-300 hover:scale-105 hover:bg-gray-50"
          disabled={isGenerating}
        >
          Keep Current
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<CheckOutlined />}
          onClick={onAccept}
          className="min-w-[140px] bg-blue-500 transition-all duration-300 hover:scale-105 hover:bg-blue-600"
          disabled={isGenerating}
        >
          Use Generated
        </Button>
      </Flex>
    </Modal>
  );
};

export default DescriptionPreview;
