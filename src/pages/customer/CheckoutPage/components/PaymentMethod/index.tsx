import { Button, Divider, Flex, Typography } from 'antd';
import { CartItemProps, CartProps } from '../../../../../types/cart.type';

const PaymentMethod = ({ checkoutList }: { checkoutList: CartProps[] }) => {
  const total = checkoutList
    .map((cart: CartProps) => {
      return cart.products.map((item: CartItemProps) => {
        return item.quantity * item.productID.price;
      });
    })
    .flat()
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
  const ship = 15000 * checkoutList.length;

  const formatOrders = (data: any[]): { orders: any[] } => {
    const orders = data.map(store => {
      // Map products to order items
      const items = store.products.map((product: any) => ({
        id: product.productID._id,
        name: product.productID.name,
        price: product.productID.price,
        quantity: product.quantity,
        totalPrice: product.productID.price * product.quantity
      }));
  
      // Calculate total amount for the store
      const amount = items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
  
      return {
        items,
        amount,
        storeID: store.store._id
      };
    });
  
    return { orders };
  };

  const handlePlaceOrder = () => {
    const data = {
      total: total,
      orders: formatOrders(checkoutList),
    }
    console.log(data);
  }
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
            <Typography.Paragraph className="m-0 text-base">{new Intl.NumberFormat().format(total)} VND</Typography.Paragraph>
          </Flex>
          <Flex justify="space-between">
            <Typography.Paragraph className="m-0 text-base">Shipment cost:</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">{new Intl.NumberFormat().format(ship)} VND</Typography.Paragraph>
          </Flex>
          <Flex justify="space-between">
            <Typography.Paragraph className="m-0 text-base">Total:</Typography.Paragraph>
            <Typography.Title level={4} className="m-0 font-normal text-blue-600">
              {new Intl.NumberFormat().format(total + ship)} VND
            </Typography.Title>
          </Flex>
        </Flex>
      </Flex>
      <Divider className="m-0" variant="dashed" />
      <Flex className="p-8" justify="space-between" align="center">
        <Typography.Paragraph className="m-0 text-gray-500">
          By clicking "Place Order", you have agreed with our policies.
        </Typography.Paragraph>
        <Button type="primary" className="px-10 py-5 text-lg" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentMethod;
