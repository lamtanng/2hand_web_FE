import { useEffect, useState } from 'react';

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

const useCart = () => {
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

  const handleOnClick = () => {
    sessionStorage.setItem('checkout', JSON.stringify(groupedByShop));
  }

  useEffect(() => {
    console.log(checkedList);
    console.log(groupedByShop);
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
