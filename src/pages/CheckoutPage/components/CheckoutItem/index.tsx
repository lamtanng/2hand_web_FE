import { MessageTwoTone, ShopOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import CheckoutDetail from '../CheckoutDetail';
import ShipmentInfo from '../ShipmentInfo';

const CheckoutItem = ({group}: {group: any}) => {
  return (
    <>
      <div id="checkout-item" className="w-full rounded-md bg-white">
        <Flex align="center" id="shop" gap={'large'} className="px-8 pt-6">
          <Flex align="center" gap={'small'}>
            <ShopOutlined className="text-base" />
            <Typography.Paragraph className="m-0 text-base">Shop name</Typography.Paragraph>
            <Button variant="text" color="primary" className="p-0 text-base hover:bg-transparent">
              <MessageTwoTone /> Chat now
            </Button>
          </Flex>
        </Flex>
        <Divider className="mb-0" />
        {group.products.map((product: any) => (
          <div className="px-8" key={product.productID}>
            <CheckoutDetail product={product}/>
          </div>
        ))}
      </div>
      <ShipmentInfo/>
    </>
  );
};

export default CheckoutItem;
