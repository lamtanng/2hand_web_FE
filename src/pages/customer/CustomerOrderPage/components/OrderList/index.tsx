import { Pagination } from 'antd';
import { OrderProps } from '../../../../../types/order.type';
import OrderItem from '../OrderItem';

const OrderList = ({ orders }: { orders: OrderProps[] }) => {
  return (
    <>
      <div id="order-list">{orders && orders.map((item: OrderProps) => <OrderItem order={item} />)}</div>
      {orders.length !== 0 && <Pagination align="center" defaultCurrent={1} total={orders.length} />}
    </>
  );
};

export default OrderList;
