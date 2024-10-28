import { useEffect, useState } from "react";

export const data = [
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
    const selectedList =
      selectedGroup?.products?.map((product: any) => {
        return product.productID;
      }) || [];
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
      .flat()
      .map((product: any) => {
        return product.productID;
      });

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
      .flat()
      .map((product: any) => {
        return product.productID;
      }).length
      ? true
      : false;

  useEffect(() => {
    console.log(checkedList);
  }, [checkedList]);

  return {
    checkedList,
    singleCheckBoxHandler,
    groupCheckBoxHandler,
    allCheckBoxHandler,
    isCheckedAll,
  }
};

export default useCart;
