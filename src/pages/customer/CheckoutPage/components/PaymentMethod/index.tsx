import { Button, Divider, Flex, Typography } from 'antd';

const PaymentMethod = ({
  handlePlaceOrder,
  total,
  totalShip,
  isLoading,
}: {
  handlePlaceOrder: () => void;
  total: number;
  totalShip: number;
  isLoading: boolean;
}) => {
  return (
    <div id="payment-method" className="mb-5 rounded-md bg-white shadow-sm">
      <Flex className="p-8" justify="space-between">
        <Typography.Title level={4} className="m-0 font-normal">
          Payment Method
        </Typography.Title>
        <Flex align="center" gap={'large'}>
          <Typography.Paragraph className="m-0 text-base">Cash on delivery</Typography.Paragraph>
          <Button variant="text" color="primary" className="p-0 text-base hover:bg-transparent">
            Change
          </Button>
        </Flex>
      </Flex>
      <Divider className="m-0" />
      <Flex justify="end" className="content-end p-8">
        <Flex gap={'middle'} vertical className="w-1/4">
          <Flex justify="space-between">
            <Typography.Paragraph className="m-0 text-base">Product price:</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              {new Intl.NumberFormat().format(total)} VND
            </Typography.Paragraph>
          </Flex>
          <Flex justify="space-between">
            <Typography.Paragraph className="m-0 text-base">Shipment cost:</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              {new Intl.NumberFormat().format(totalShip)} VND
            </Typography.Paragraph>
          </Flex>
          <Flex justify="space-between">
            <Typography.Paragraph className="m-0 text-base">Total:</Typography.Paragraph>
            <Typography.Title level={4} className="m-0 font-normal text-blue-600">
              {new Intl.NumberFormat().format(total + totalShip)} VND
            </Typography.Title>
          </Flex>
        </Flex>
      </Flex>
      <Divider className="m-0" variant="dashed" />
      <Flex className="p-8" justify="space-between" align="center">
        <Typography.Paragraph className="m-0 text-gray-500">
          By clicking "Place Order", you have agreed with our policies.
        </Typography.Paragraph>
        <Button type="primary" className="px-10 py-5 text-lg" onClick={handlePlaceOrder} loading={isLoading}>
          Place Order
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentMethod;
