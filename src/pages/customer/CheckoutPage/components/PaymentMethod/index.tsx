import { Button, Divider, Flex, Typography } from 'antd';
import { PaymentMethodProps } from '../../../../../types/paymentMethod.type';

const PaymentMethod = ({
  handlePlaceOrder,
  total,
  totalShip,
  isLoading,
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
}: {
  handlePlaceOrder: () => void;
  total: number;
  totalShip: number;
  isLoading: boolean;
  paymentMethods: PaymentMethodProps[];
  selectedMethod: PaymentMethodProps | undefined;
  setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethodProps | undefined>>;
}) => {
  return (
    <div id="payment-method" className="mb-5 rounded-md bg-white shadow-sm">
      <Flex className="p-8" justify="space-between">
        <Typography.Title level={4} className="m-0 font-normal">
          Payment Method
        </Typography.Title>
        <Flex gap={'large'}>
          {paymentMethods.map((payment: PaymentMethodProps) => (
            <label
              key={payment._id}
              className={`relative flex cursor-pointer flex-col items-center rounded-sm border border-solid px-4 py-2  transition-all duration-200 ${
                selectedMethod?._id === payment._id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } `}
            >
              <input
                type="radio"
                name="condition"
                value={JSON.stringify(payment)}
                checked={selectedMethod === payment}
                onChange={(e) => setSelectedMethod(JSON.parse(e.currentTarget.value))}
                className="hidden"
              />
              <span
                className={`text-base font-medium ${selectedMethod?._id === payment._id ? 'text-blue-600' : 'text-gray-900'} `}
              >
                {payment.name}
              </span>
            </label>
          ))}
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
