import { Flex, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ReviewButton } from '../../../../../components/elements/Buttons/CustomerOrderButtons';
import ReviewModal from '../ReviewModal';
import defaultPic from '../../../../../assets/blob.jpg';
import { useState } from 'react';
import { OrderProps } from '../../../../../types/order.type';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';

const OrderDetail = ({ order, item }: { order: OrderProps; item: OrderDetailProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div id="order-detail" className="mt-6">
      <Flex justify="space-between" align="center">
        <Link to={order._id}>
          <div id="product-info" className="w-5/6">
            <Flex gap={'middle'}>
              <Image width={75} preview={false} alt="" src={item.productID.image[0]} fallback={defaultPic} />
              <div>
                <Typography.Title level={5} className="m-0 mb-2">
                  {item.productID.name}
                </Typography.Title>
                <Typography.Paragraph className="text-xs">x {item.quantity}</Typography.Paragraph>
              </div>
            </Flex>
          </div>
        </Link>
        {/* <div id="prodct-price" className="font-sans">
        {item.productID.price} VND
      </div> */}
        <ReviewButton onClick={openReviewModal} />
        <ReviewModal isModalOpen={isModalOpen} product={item} setIsModalOpen={setIsModalOpen} />
      </Flex>
    </div>
  );
};

export default OrderDetail;
