import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Typography } from 'antd';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import ReviewForm from '../../../../../components/elements/Form/ReviewForm';

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
          <ReviewForm product={product} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
