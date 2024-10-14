import OrderStatusMenu from '../../../../components/elements/Menus/OrderStatusMenu';
import Search from 'antd/es/input/Search';
import Order from './components/Order';

const MyOrders = () => {
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
          <OrderStatusMenu />
      </div>
      <Search
        placeholder="You can search orders base on order ID, shop or product"
        enterButton
        className="my-5 h-10 text-base"
      />
      <div id="order-list">
        <Order />
      </div>
    </div>
  );
};

export default MyOrders;
