import { Flex, Typography, Image } from 'antd';
import { Link } from 'react-router-dom';
import { OrderProps } from '../../../../../types/order.type';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import defaultPic from '../../../../../assets/blob.webp';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';

const OrderDetail = ({ order, item }: { order: OrderProps; item: OrderDetailProps }) => {
  return (
    <Link to={order._id}>
      <div id="order-detail" className="mt-6">
        <Flex justify="space-between" align="center">
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
          <div id="prodct-price" className="font-sans">
            {formattedCurrency(item.productID.price)}
          </div>
        </Flex>
      </div>
    </Link>
  );
};

export default OrderDetail;
