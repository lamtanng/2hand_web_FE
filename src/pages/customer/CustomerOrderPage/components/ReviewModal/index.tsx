import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Image, Rate, Typography } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';
import TextArea from 'antd/es/input/TextArea';
import ImageUploader from '../ImageUploader';
import { useState } from 'react';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';

const ReviewModal = ({
  isModalOpen,
  setIsModalOpen,
  product,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: OrderDetailProps;
}) => {
  console.log(product.productID.name);
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const handleClose = () => {
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
        <Typography.Title level={4} className="m-0 text-blue-600">
          Review Product
        </Typography.Title>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6">
          <Flex id="product" gap={'middle'} className="mb-6">
            <Image width={75} alt="" src={product?.productID?.image[0]} fallback={defaultPic} />
            <Typography.Paragraph className="m-0">{product?.productID?.name}</Typography.Paragraph>
          </Flex>
          <Flex gap={'middle'} className="mb-6">
            <Typography.Paragraph className="m-0">Product quality:</Typography.Paragraph>
            <Rate onChange={(e) => console.log(e)} />
          </Flex>
          <Flex vertical gap={'small'} className="mb-6">
            <Typography.Paragraph className="m-0">Content: </Typography.Paragraph>
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 3 }}
              onChange={(e) => console.log('Change:', e.target.value)}
            />
          </Flex>
          <Flex vertical gap={'small'}>
            <Typography.Paragraph className="m-0">Media: </Typography.Paragraph>
            <ImageUploader base64Images={base64Images} setBase64Images={setBase64Images} />
          </Flex>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base">Cancel</Button>
            <Button type="primary" className="px-8 py-5 text-base">
              OK
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
