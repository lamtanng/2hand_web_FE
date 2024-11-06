import { MessageTwoTone, ShopOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import CheckoutDetail from '../CheckoutDetail';
import ShipmentInfo from '../ShipmentInfo';
import { CartItemProps, CartProps } from '../../../../../types/cart.type';

const CheckoutItem = ({group}: {group: CartProps}) => {
  return (
    <>
      <div id="checkout-item" className="w-full rounded-md bg-white">
        <Flex align="center" id="shop" gap={'large'} className="px-8 pt-6">
          <Flex align="center" gap={'small'}>
            <ShopOutlined className="text-base" />
            <Typography.Paragraph className="m-0 text-base">{group.store.name}</Typography.Paragraph>
            <Button variant="text" color="primary" className="p-0 text-base hover:bg-transparent">
              <MessageTwoTone /> Chat now
            </Button>
          </Flex>
        </Flex>
        <Divider className="mb-0" />
        {group.products.map((product: CartItemProps) => (
          <div className="px-8" key={product.productID._id}>
            <CheckoutDetail product={product}/>
          </div>
        ))}
      </div>
      <ShipmentInfo product={group.products}/>
    </>
  );
};

export default CheckoutItem;
