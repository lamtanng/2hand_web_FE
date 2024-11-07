import OrderItem from '../../ListItem/OrderItem';

const OrderList = () => {
  const data = [
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
  ];
  return (
    <div id="order-list">
      {data.map((item: any) => (
        <OrderItem key={item.key} />
      ))}
    </div>
  );
};

export default OrderList;
