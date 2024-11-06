import { Button, Divider, Flex, Input, Typography } from 'antd';
import { CartItemProps } from '../../../../../types/cart.type';

const ShipmentInfo = ({ product }: { product: CartItemProps[] }) => {
  return (
    <div id="shipment-info" className="mb-6 w-full rounded-md bg-blue-50">
      <div className="p-8">
        <Flex gap={'large'} align="center">
          <Flex gap={'middle'} align="center" className="w-2/5">
            <Typography.Paragraph className="w-1/10 m-0 text-base">Notes: </Typography.Paragraph>
            <Input className="w-5/6 text-base" />
          </Flex>
          <Flex className="w-3/5" gap={'middle'} align="center">
            <Typography.Paragraph className="m-0 w-1/5 text-base">Shipment method:</Typography.Paragraph>
            <Flex gap={'middle'} justify="space-between" align="center" className="w-4/5">
              <Typography.Paragraph className="m-0 text-base">Fast</Typography.Paragraph>
              <Button variant="text" color="primary" className="m-0 p-0 text-base hover:bg-transparent">
                Change
              </Button>
              <Typography.Paragraph className="m-0 text-base">{15000} VND</Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Divider className="m-0" variant="dashed" />
      <Flex gap={'middle'} justify="end" className="p-8">
        <Typography.Paragraph className="m-0 text-base">
          Total Price ({product.length} {product.length > 1 ? 'products' : 'product'}):
        </Typography.Paragraph>
        <Typography.Title level={4} className="m-0 font-normal text-blue-600">
          {product
            .map((item: CartItemProps) => {
              return item.productID.price * item.quantity;
            })
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}{' '}
          VND
        </Typography.Title>
      </Flex>
    </div>
  );
};

export default ShipmentInfo;
