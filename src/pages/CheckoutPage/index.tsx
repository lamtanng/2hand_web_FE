import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import { Flex, Typography } from 'antd';
import ReceiverAddress from './components/ReceiverAddress';
import CheckoutItem from './components/CheckoutItem';
import PaymentMethod from './components/PaymentMethod';

const CheckoutPage = () => {
  const checkoutList = sessionStorage.getItem('checkout') || '';
  const checkoutItems = JSON.parse(checkoutList);
  console.log(checkoutItems);
  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <ReceiverAddress />
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
            {checkoutItems.map((group: any) => (
              <div id="checkout-card" key={group.shopID} className="shadow-sm">
                <CheckoutItem group={group} />
              </div>
            ))}
          </div>
          <PaymentMethod />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;