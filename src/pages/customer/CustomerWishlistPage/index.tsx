import { Typography } from 'antd';
import WishlistList from './components/WishlistList';

const Wishlist = () => {
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Typography.Title level={3}>Wishlist</Typography.Title>
      </div>
      <WishlistList />
      {/* {isLoading ? <PageSpin /> : <AddressList profile={profile} />} */}
    </div>
  );
};

export default Wishlist;
