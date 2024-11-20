import { Flex, Typography } from 'antd';
import ReceiverAddress from './components/ReceiverAddress';
import CheckoutItem from './components/CheckoutItem';
import PaymentMethod from './components/PaymentMethod';
import Header from '../../../components/elements/Header';
import Footer from '../../../components/elements/Footer';
import { CartItemProps, CartProps } from '../../../types/cart.type';
import useCheckoutPage from './useCheckoutPage';

const CheckoutPage = () => {
  const checkoutList = sessionStorage.getItem('checkout') || '';
  const checkoutItems: CartProps[] = JSON.parse(checkoutList);
  const total = checkoutItems
    .map((cart: CartProps) => {
      return cart.products.map((item: CartItemProps) => {
        return item.quantity * item.productID.price;
      });
    })
    .flat()
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  const { profile, value, setValue, handlePlaceOrder, shipment, selectedShipment, isLoading } = useCheckoutPage(
    checkoutItems,
    total,
  );

  const totalShip = selectedShipment.reduce((accumulator: number, item: any) => accumulator + item.total, 0);

  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <ReceiverAddress profile={profile} value={value} setValue={setValue} />
          <div id="head" className="mb-6 rounded-md bg-white p-8 shadow-sm">
            <Flex>
              <Flex gap={'large'} className="w-1/2">
                <Typography.Paragraph className="m-0 text-base">Product</Typography.Paragraph>
              </Flex>
              <Flex justify="space-between" className="w-1/2">
                <Typography.Paragraph className="m-0 flex w-1/3 shrink-0 items-center justify-center text-base">
                  Price
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 flex w-1/3 shrink-0 items-center justify-center text-base">
                  Quantity
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 flex w-1/3 shrink-0 items-center justify-center text-base">
                  Total
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </div>
          <div id="checkout-list">
            {checkoutItems.map((group: CartProps) => (
              <div id="checkout-card" key={group.store._id} className="shadow-sm">
                <CheckoutItem
                  group={group}
                  shipment={shipment.filter((item: any) => item.store._id === group.store._id)}
                  finalShipment={selectedShipment.find((item: any) => item.store._id === group.store._id)}
                />
              </div>
            ))}
          </div>
          <PaymentMethod handlePlaceOrder={handlePlaceOrder} total={total} totalShip={totalShip} isLoading={isLoading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
