import React, { useMemo, useState, useEffect } from 'react';
import { Modal, Typography, Flex, Button, Alert, List, Divider, Badge, Popconfirm, Space, Checkbox } from 'antd';
import {
  CloseCircleOutlined,
  CheckOutlined,
  ReloadOutlined,
  LoadingOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import ImageUploader from '../ImageUploader';
import parse from 'html-react-parser';

interface CommunityStandardWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  currentDescription: string;
  generatedDescription: string;
  isGenerating: boolean;
  onRegenerate: (openPreview?: boolean) => void;
  base64Images: string[];
  setBase64Images: React.Dispatch<React.SetStateAction<string[]>>;
  violatingImages?: number[];
  setViolatingImages?: React.Dispatch<React.SetStateAction<number[]>>;
  violatingTexts?: string[];
  onBypass?: () => void;
}

const CommunityStandardWarning: React.FC<CommunityStandardWarningProps> = ({
  isOpen,
  onClose,
  onEdit,
  currentDescription,
  generatedDescription,
  isGenerating,
  onRegenerate,
  base64Images,
  setBase64Images,
  violatingImages = [],
  setViolatingImages,
  violatingTexts = [],
  onBypass,
}) => {
  const [bypassConfirmed, setBypassConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAutoGenerateMessage, setShowAutoGenerateMessage] = useState(false);

  // Function to highlight violating text in the HTML content
  const highlightedDescription = useMemo(() => {
    if (!violatingTexts || violatingTexts.length === 0 || !currentDescription) {
      return currentDescription;
    }

    let tempDescription = currentDescription;

    // Sort violating texts by length (descending) to avoid nested highlighting issues
    const sortedViolatingTexts = [...violatingTexts].sort((a, b) => b.length - a.length);

    // Replace each violating text with a highlighted version
    sortedViolatingTexts.forEach((text) => {
      if (!text.trim()) return; // Skip empty strings

      // Use a regex that respects word boundaries when appropriate, but also works for non-word characters
      const regex = new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      tempDescription = tempDescription.replace(
        regex,
        '<span style="background-color: #ffccc7; padding: 2px; border-radius: 2px; display: inline-block;">$1</span>',
      );
    });

    return tempDescription;
  }, [currentDescription, violatingTexts]);

  const handleBypass = () => {
    if (onBypass) {
      setIsSubmitting(true);
      onBypass();
    }
  };

  const hasImageViolations = violatingImages && violatingImages.length > 0;
  const hasTextViolations = violatingTexts && violatingTexts.length > 0;

  // Show auto-generate message when text violations are detected and generation is in progress
  useEffect(() => {
    if (hasTextViolations && isGenerating) {
      setShowAutoGenerateMessage(true);
    } else if (!isGenerating && showAutoGenerateMessage) {
      // Keep message visible for a few seconds after generation completes
      const timer = setTimeout(() => {
        setShowAutoGenerateMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasTextViolations, isGenerating, showAutoGenerateMessage]);

  return (
    <Modal
      title={
        <Flex align="center" gap="small">
          <WarningOutlined className="text-xl text-yellow-500" />
          <Typography.Title level={4} className="!m-0">
            Community Standards Warning
          </Typography.Title>
        </Flex>
      }
      open={isOpen}
      footer={null}
      onCancel={onClose}
      width={1200}
      centered
      maskClosable={false}
      closable={true}
      className="community-warning-modal"
      bodyStyle={{
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
      }}
    >
      <Divider className="!mb-6 !mt-3" />

      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 251, 230, 1)',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <Typography.Text>
          We've detected content that may not comply with our community guidelines. Please review and update your
          listing before submitting.
        </Typography.Text>
      </div>

      {hasTextViolations && showAutoGenerateMessage && (
        <Alert
          message="Auto-generating alternative description"
          description="We're automatically generating a new description to help you fix the detected issues."
          type="info"
          showIcon
          className="mb-6"
        />
      )}

      <div>
        <Typography.Title level={5} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          Product Images:
          {hasImageViolations && (
            <Typography.Text type="danger" style={{ marginLeft: '8px', fontSize: '16px' }}>
              ({violatingImages.length} image{violatingImages.length > 1 ? 's' : ''} with potential violations)
            </Typography.Text>
          )}
        </Typography.Title>
        <ImageUploader
          base64Images={base64Images}
          setBase64Images={setBase64Images}
          violatingImages={violatingImages}
          setViolatingImages={setViolatingImages}
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <Typography.Title level={5} style={{ display: 'flex', alignItems: 'center' }}>
          Product Description:
          {hasTextViolations && (
            <Typography.Text type="danger" style={{ marginLeft: '8px', fontSize: '16px' }}>
              ({violatingTexts.length} potential violation{violatingTexts.length > 1 ? 's' : ''})
            </Typography.Text>
          )}
        </Typography.Title>
        <Flex gap={'large'} justify="space-between" style={{ minHeight: '60vh' }}>
          {/* Left Side - Current Description */}
          <div style={{ width: '100%', background: 'rgba(243 244 246 1)', padding: '0 16px', borderRadius: '12px' }}>
            <Flex align="center" gap="small" className="mb-4">
              <Typography.Title level={5} style={{ margin: '12px 0' }}>
                Current Description
              </Typography.Title>
            </Flex>
            <div
              className="w-full overflow-y-auto rounded-lg bg-white p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
              style={{
                minHeight: '200px',
              }}
            >
              <div className="prose max-w-none">
                {highlightedDescription ? (
                  parse(highlightedDescription)
                ) : (
                  <Typography.Text className="text-gray-400" italic>
                    No current description available
                  </Typography.Text>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Generated Description */}
          <div style={{ width: '100%', background: 'rgba(239 246 255 1)', padding: '16px', borderRadius: '12px' }}>
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
                onClick={() => onRegenerate(false)}
                disabled={isGenerating}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Regenerate
              </Button>
            </Flex>
            <div
              className="w-full overflow-y-auto rounded-lg bg-white p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
              style={{
                minHeight: '200px',
              }}
            >
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
      </div>

      {hasTextViolations && (
        <div style={{ marginTop: '16px' }}>
          <Typography.Title level={5}>Problematic text:</Typography.Title>
          <List
            size="small"
            bordered
            dataSource={violatingTexts}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text type="danger">"{item}"</Typography.Text>
              </List.Item>
            )}
            style={{ backgroundColor: 'white' }}
          />
        </div>
      )}

      <Divider className="!my-4" />

      <Flex justify="space-between" align="center" gap="middle">
        <Checkbox
          checked={bypassConfirmed}
          onChange={(e) => setBypassConfirmed(e.target.checked)}
          style={{ fontSize: '14px' }}
        >
          I understand that my listing may be rejected or removed if it violates community standards
        </Checkbox>

        <Space>
          <Button size="large" icon={<CloseCircleOutlined />} onClick={onClose} className="min-w-[140px]">
            Cancel
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<CheckOutlined />}
            onClick={onEdit}
            className="min-w-[140px] bg-blue-500 hover:bg-blue-600"
          >
            Edit Listing
          </Button>

          {onBypass && (
            <Popconfirm
              title="Proceed with potential violations?"
              description="Your listing may be removed later if it's found to violate our community guidelines."
              icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              onConfirm={handleBypass}
              okText="Yes, proceed"
              cancelText="Cancel"
              disabled={!bypassConfirmed}
            >
              <Button
                type="default"
                size="large"
                danger
                // loading={isSubmitting}
                disabled={!bypassConfirmed}
                className="min-w-[140px]"
              >
                Submit Anyway
              </Button>
            </Popconfirm>
          )}
        </Space>
      </Flex>
    </Modal>
  );
};

export default CommunityStandardWarning;
