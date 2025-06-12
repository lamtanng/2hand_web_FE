import { Button, Divider, Flex, Image, Rate, Typography, Spin, Alert } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ImageUploader from '../ProductForm/components/ImageUploader';
import defaultPic from '../../../../assets/blob.webp';
import { OrderDetailProps } from '../../../../types/orderDetail.type';
import useReviewForm from './useReviewForm';
import { useAppSelector } from '../../../../redux/hooks';
import { loginSelector } from '../../../../redux/slices/login.slice';
import { OrderProps } from '../../../../types/order.type';
import { WarningOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

const ReviewForm = ({
  order,
  product,
  setIsModalOpen,
}: {
  order?: OrderProps;
  product: OrderDetailProps;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAppSelector(loginSelector);
  const {
    base64Images,
    setBase64Images,
    content,
    setContent,
    rate,
    setRate,
    isDirty,
    setDirty,
    addNewReview,
    violatingImages,
    violatingTexts,
    highlightedContent,
    isCheckingStandards,
  } = useReviewForm(user, product, setIsModalOpen, order);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    addNewReview();
  };

  const hasViolations = violatingTexts.length > 0 || violatingImages.length > 0;

  return (
    <>
      <Flex id="product" gap={'middle'} className="mb-6">
        <Image width={75} alt="" src={product?.productID?.image[0]} fallback={defaultPic} />
        <Typography.Paragraph className="m-0">{product?.productID?.name}</Typography.Paragraph>
      </Flex>
      <Flex gap={'middle'} className="mb-6">
        <Typography.Paragraph className="m-0">
          Product quality <span className="text-red-600">*</span>:{' '}
        </Typography.Paragraph>
        <Rate
          onChange={(e) => {
            setRate(e);
            setDirty(false);
          }}
          value={rate}
        />
      </Flex>

      {hasViolations && (
        <Alert
          message="Community Standards Warning"
          description="Your review contains content that may violate our community standards. Please review the highlighted areas and make changes before submitting."
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          className="mb-6"
        />
      )}

      <Flex vertical gap={'small'} className="mb-6">
        <Typography.Paragraph className="m-0">Content: </Typography.Paragraph>
        {violatingTexts.length > 0 && highlightedContent ? (
          <div className="mb-2">
            <div
              className="w-full overflow-y-auto rounded-lg border border-red-300 bg-white p-4"
              style={{
                minHeight: '100px',
                maxHeight: '200px',
              }}
            >
              <div className="prose max-w-none">{parse(highlightedContent)}</div>
            </div>
            <Typography.Text type="danger" className="mt-1 block text-xs">
              <WarningOutlined /> Text highlighted in red may violate community standards
            </Typography.Text>
          </div>
        ) : null}
        <TextArea
          showCount
          maxLength={500}
          autoSize={{ minRows: 3 }}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          status={violatingTexts.length > 0 ? 'error' : ''}
        />
      </Flex>

      <Flex vertical gap={'small'}>
        <Flex align="center" gap="small">
          <Typography.Paragraph className="m-0">Media: </Typography.Paragraph>
          {violatingImages.length > 0 && (
            <Typography.Text type="danger" className="text-xs">
              <WarningOutlined /> {violatingImages.length} image(s) may violate community standards
            </Typography.Text>
          )}
        </Flex>
        <ImageUploader
          base64Images={base64Images}
          setBase64Images={setBase64Images}
          violatingImages={violatingImages}
        />
      </Flex>

      <Divider />
      <Flex justify="end" gap={'large'}>
        <Button className="px-8 py-5 text-base" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="primary"
          className="px-8 py-5 text-base"
          onClick={handleOk}
          disabled={isDirty || isCheckingStandards}
        >
          {isCheckingStandards ? <Spin size="small" /> : 'OK'}
        </Button>
      </Flex>
    </>
  );
};

export default ReviewForm;
