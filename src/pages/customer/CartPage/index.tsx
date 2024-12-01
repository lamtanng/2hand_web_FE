import { Checkbox, Flex, Skeleton, Typography } from 'antd';
import CartItem from './components/CartItem';
import Summary from './components/Summary';
import useCart from './useCartPage';
import Header from '../../../components/elements/Header';
import ProductList from '../../../components/elements/Lists/ProductList';
import Footer from '../../../components/elements/Footer';
import { CartItemProps, CartProps } from '../../../types/cart.type';
import SoldoutProduct from './components/SoldoutProducts';
import EmptyCart from './components/EmptyCart';

const CartPage = () => {
  const {
    checkedList,
    isCheckedAll,
    allCheckBoxHandler,
    groupCheckBoxHandler,
    singleCheckBoxHandler,
    handleCheckout,
    cart,
    itemAmount,
    totalPrice,
    handleDelete,
    handleQuantityChange,
    soldoutProducts,
    isLoading,
  } = useCart();

  const actualCart = cart.filter(
    (item: CartProps) => item.products.filter((product: CartItemProps) => product.productID.quantity > 0).length !== 0,
  );

  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div id="head" className="mb-5 rounded-md bg-white p-8 shadow-sm">
            <Flex>
              <Flex gap={'large'} className="w-1/2">
                <Checkbox onChange={allCheckBoxHandler} checked={isCheckedAll} />
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
          {isLoading ? (
            <Skeleton />
          ) : (
            <div id="cart-list">
              {actualCart.length !== 0 ? (
                actualCart.map((group: CartProps) => (
                  <CartItem
                    group={group}
                    groupCheckBoxHandler={groupCheckBoxHandler}
                    checkedList={checkedList}
                    singleCheckBoxHandler={singleCheckBoxHandler}
                    handleDelete={handleDelete}
                    handleQuantityChange={handleQuantityChange}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          )}
          {!isLoading && soldoutProducts.length !== 0 && (
            <div id="soldout-products">
              <SoldoutProduct soldoutProducts={soldoutProducts} handleDelete={handleDelete} checkedList={checkedList} />
            </div>
          )}
          {actualCart.length !== 0 && (
            <Summary
              checkedList={checkedList}
              allCheckBoxHandler={allCheckBoxHandler}
              checked={isCheckedAll}
              handleOnClick={handleCheckout}
              itemAmount={itemAmount}
              totalPrice={totalPrice}
            />
          )}
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
