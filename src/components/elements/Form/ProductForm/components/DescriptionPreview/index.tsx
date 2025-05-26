import React from 'react';
import { Modal, Typography, Flex, Button, Divider, Card, Badge } from 'antd';
import { CheckOutlined, CloseOutlined, SwapRightOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

interface DescriptionPreviewProps {
  isOpen: boolean;
  currentDescription: string;
  generatedDescription: string;
  onAccept: () => void;
  onReject: () => void;
  isGenerating?: boolean;
}

const DescriptionPreview: React.FC<DescriptionPreviewProps> = ({
  isOpen,
  currentDescription,
  generatedDescription,
  onAccept,
  onReject,
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
        overflowY: 'auto',
      }}
    >
      <Divider className="!mb-6 !mt-3" />
      <Flex vertical gap="large">
        <div className="relative grid grid-cols-2 gap-6">
          <Card
            title={
              <Flex align="center" gap="small">
                <Typography.Text className="text-gray-500">Current Description</Typography.Text>
              </Flex>
            }
            className="h-full shadow-sm transition-all duration-300 hover:shadow-md"
            bodyStyle={{
              maxHeight: 'calc(100vh - 400px)',
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#fafafa',
            }}
          >
            <div className="prose max-w-none">
              {currentDescription ? (
                parse(currentDescription)
              ) : (
                <Typography.Text className="text-gray-400" italic>
                  No current description available
                </Typography.Text>
              )}
            </div>
          </Card>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-transform hover:scale-110">
              <SwapRightOutlined className="text-xl text-white" />
            </div>
          </div>

          <Card
            title={
              <Flex align="center" gap="small">
                <Badge status="processing">
                  <Typography.Text className="font-medium text-blue-600">Generated Description</Typography.Text>
                </Badge>
              </Flex>
            }
            className="h-full shadow-sm transition-all duration-300 hover:shadow-md"
            bodyStyle={{
              maxHeight: 'calc(100vh - 400px)',
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: isGenerating ? '#f5f5f5' : '#f0f5ff',
            }}
            bordered={false}
          >
            {isGenerating ? (
              <Flex vertical className="h-full items-center justify-center" gap="middle">
                <LoadingOutlined className="animate-spin text-4xl text-blue-500" />
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
          </Card>
        </div>

        <Divider className="!my-4" />

        <Flex gap="middle" justify="center">
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
      </Flex>
    </Modal>
  );
};

export default DescriptionPreview;
