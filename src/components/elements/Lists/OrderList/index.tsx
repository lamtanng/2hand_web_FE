import OrderItem from '../../ListItem/OrderItem';

const OrderList = ({orders}: {orders: any[]}) => {
  return (
    <div id="order-list">
      {orders && orders.map((item: any) => (
        <OrderItem order={item} />
      ))}
    </div>
  );
};

export default OrderList;
