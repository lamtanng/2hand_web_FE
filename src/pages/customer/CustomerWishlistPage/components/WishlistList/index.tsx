import { Divider, Flex, Image, Button } from 'antd';
import WishlistItem from '../WishlistItem';
import emptyWishlist from '../../../../../assets/emptyCart.webp';

const WishlistList = () => {
  const profile = { wishlist: [] };
  return (
    <div id="wishlist-list" className="mb-6">
      {profile?.wishlist?.length !== 0 ? (
        profile?.wishlist?.map((item: any) => (
          <div id="wishlist-item">
            <Divider />
            <WishlistItem />
          </div>
        ))
      ) : (
        <>
          <Divider />
          <Flex justify="center" align="center" vertical gap={'middle'}>
            <Image width={'30%'} alt="" src={emptyWishlist} fallback="" preview={false} />
            <Button type="primary">Explore more products.</Button>
          </Flex>
        </>
      )}
    </div>
  );
};

export default WishlistList;
