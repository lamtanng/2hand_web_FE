import { Button, Checkbox, Flex, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import ProductList from '../../components/elements/Lists/ProductList';
import { useEffect, useState } from 'react';
import CartItem from './components/CartItem';
import Summary from './components/Summary';

const data = [
  {
    shop: {
      id: 1,
    },
    products: [
      {
        productID: 11,
      },
      {
        productID: 12,
      },
    ],
  },
  {
    shop: {
      id: 2,
    },
    products: [
      {
        productID: 21,
      },
      {
        productID: 22,
      },
    ],
  },
];

const CartPage = () => {
  const [checkedList, setCheckedList] = useState<any[]>([]);

  const singleCheckBoxHandler = (event: any) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList((prevData) => {
        return prevData.filter((key) => {
          return key !== value;
        });
      });
    }
  };

  const groupCheckBoxHandler = (event: any) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    const selectedGroup = data.find((group: any) => {
      return group.shop.id === value;
    });
    const selectedList =
      selectedGroup?.products?.map((product: any) => {
        return product.productID;
      }) || [];

    if (isSelected) {
      setCheckedList([...checkedList, ...selectedList]);
    } else {
      selectedList.forEach((id: any) => {
        setCheckedList((prevData) => {
          return prevData.filter((key) => {
            return key !== id;
          });
        });
      });
    }
  };

  useEffect(() => {
    console.log(checkedList);
  }, [checkedList]);

  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div id="head" className="mb-5 rounded-md bg-white p-8 shadow-sm">
            <Flex>
              <Flex gap={'large'} className="w-1/2">
                <Checkbox />
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
          <Summary checkedList={checkedList} />
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
