import { OrderProps } from '../../../../types/order.type';
import OrderItem from '../../ListItem/OrderItem';

const OrderList = ({orders}: {orders: OrderProps[]}) => {
  return (
    <div id="order-list">
      {orders && orders.map((item: OrderProps) => (
        <OrderItem order={item} />
      ))}
    </div>
  );
};

export default OrderList;
