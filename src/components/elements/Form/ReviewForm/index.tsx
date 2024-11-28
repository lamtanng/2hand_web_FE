import { Button, Divider, Flex, Image, Rate, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ImageUploader from '../ProductForm/components/ImageUploader';
import defaultPic from '../../../../assets/blob.jpg';
import { OrderDetailProps } from '../../../../types/orderDetail.type';
import useReviewForm from './useReviewForm';
import { useAppSelector } from '../../../../redux/hooks';
import { loginSelector } from '../../../../redux/slices/login.slice';

const ReviewForm = ({
  product,
  setIsModalOpen,
}: {
  product: OrderDetailProps;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAppSelector(loginSelector);
  const { base64Images, setBase64Images, addNewReview, setContent, setRate } = useReviewForm(user, product);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    addNewReview();
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex id="product" gap={'middle'} className="mb-6">
        <Image width={75} alt="" src={product?.productID?.image[0]} fallback={defaultPic} />
        <Typography.Paragraph className="m-0">{product?.productID?.name}</Typography.Paragraph>
      </Flex>
      <Flex gap={'middle'} className="mb-6">
        <Typography.Paragraph className="m-0">Product quality:</Typography.Paragraph>
        <Rate onChange={(e) => setRate(e)} />
      </Flex>
      <Flex vertical gap={'small'} className="mb-6">
        <Typography.Paragraph className="m-0">Content: </Typography.Paragraph>
        <TextArea showCount maxLength={500} autoSize={{ minRows: 3 }} onChange={(e) => setContent(e.target.value)} />
      </Flex>
      <Flex vertical gap={'small'}>
        <Typography.Paragraph className="m-0">Media: </Typography.Paragraph>
        <ImageUploader base64Images={base64Images} setBase64Images={setBase64Images} />
      </Flex>
      <Divider />
      <Flex justify="end" gap={'large'}>
        <Button className="px-8 py-5 text-base" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
          OK
        </Button>
      </Flex>
    </>
  );
};

export default ReviewForm;
