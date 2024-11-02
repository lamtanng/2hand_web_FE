import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const data = [
  {
    shop: {
      id: 1,
    },
    products: [
      {
        productID: 11,
        shopID: 1,
      },
      {
        productID: 12,
        shopID: 1,
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
        shopID: 2,
      },
      {
        productID: 22,
        shopID: 2,
      },
    ],
  },
];

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: 'Please choose at least one product',
  });
};

const useCart = () => {
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const navigate = useNavigate();

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
    const selectedList = selectedGroup?.products || [];
    const insertedList = [...checkedList, ...selectedList].sort();

    if (isSelected) {
      setCheckedList([...new Set(insertedList)]);
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

  const allCheckBoxHandler = (event: any) => {
    let isSelected = event.target.checked;
    const insertedList = data
      .map((group: any) => {
        return group.products;
      })
      .flat();

    if (isSelected) {
      setCheckedList([...insertedList]);
    } else {
      setCheckedList([]);
    }
  };

  const isCheckedAll =
    checkedList.length ===
    data
      .map((group: any) => {
        return group.products;
      })
      .flat().length
      ? true
      : false;

  const groupedByShop = checkedList.reduce((acc, item) => {
    const { shopID } = item;
    if (!acc[shopID]) {
      acc[shopID] = [];
    }
    acc[shopID].push(item);
    return acc;
  }, {});

  const groupedByShopArray = Object.entries(groupedByShop).map(([shopID, products]) => ({
    shopID: Number(shopID), // Convert the shopID back to a number
    products,
  }));

  const handleOnClick = () => {
    if (checkedList.length === 0) {
        showConfirm()
    } else {
        sessionStorage.setItem('checkout', JSON.stringify(groupedByShopArray));
    navigate('/checkout');
    }
  };

  useEffect(() => {
    console.log(checkedList);
    console.log(groupedByShopArray);
  }, [checkedList]);

  return {
    checkedList,
    singleCheckBoxHandler,
    groupCheckBoxHandler,
    allCheckBoxHandler,
    isCheckedAll,
    handleOnClick,
  };
};

export default useCart;
