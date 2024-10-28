import { Checkbox, Flex, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import ProductList from '../../components/elements/Lists/ProductList';
import CartItem from './components/CartItem';
import Summary from './components/Summary';
import useCart, { data } from './useCartPage';

const CartPage = () => {
  const {checkedList, isCheckedAll, allCheckBoxHandler, groupCheckBoxHandler, singleCheckBoxHandler} = useCart();

  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div id="head" className="mb-5 rounded-md bg-white p-8 shadow-sm">
            <Flex>
              <Flex gap={'large'} className="w-1/2">
                <Checkbox
                  onChange={allCheckBoxHandler}
                  checked={isCheckedAll}
                />
                <Typography.Paragraph className="m-0 text-base">Product</Typography.Paragraph>
              </Flex>
              <Flex justify="space-between" className="w-1/2">
                <Typography.Paragraph className="m-0 flex w-1/4 shrink-0 items-center justify-center text-base">
                  Price
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 flex w-1/4 shrink-0 items-center justify-center text-base">
                  Quantity
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 flex w-1/4 shrink-0 items-center justify-center text-base">
                  Total
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 flex w-1/4 shrink-0 items-center justify-center text-base">
                  Actions
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </div>
          <div id="cart-list">
            {data.map((group: any) => (
              <CartItem
                group={group}
                groupCheckBoxHandler={groupCheckBoxHandler}
                checkedList={checkedList}
                singleCheckBoxHandler={singleCheckBoxHandler}
              />
            ))}
          </div>
          <Summary checkedList={checkedList} allCheckBoxHandler={allCheckBoxHandler} checked={isCheckedAll} />
          <div id="recommend-products" className="mt-10">
            <Typography.Title level={3} className="m-0">
              Recommended Products
            </Typography.Title>
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
