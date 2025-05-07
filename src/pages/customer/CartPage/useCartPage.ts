import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPIs } from '../../../apis/cart.api';
import { handleError } from '../../../utils/handleError';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { DeleteCartItemProps, NewCartItemProps } from '../../../types/http/cart.type';
import { displaySuccess } from '../../../utils/displayToast';
import eventEmitter from '../../../utils/eventEmitter';
import { CartItemProps, CartProps } from '../../../types/cart.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { StoreProps } from '../../../types/store.type';

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: 'Please choose at least one product',
  });
};

const useCart = () => {
  const { user } = useAppSelector(loginSelector);
  const [checkedList, setCheckedList] = useState<CartItemProps[]>([]);
  const [cart, setCart] = useState<CartProps[]>([]);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [soldoutProducts, setSoldoutProduct] = useState<CartItemProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUserCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPIs.getCart();
      const cartItemAmount = res.data
        .map((group: CartProps) => {
          return group.products;
        })
        .flat()
        .filter((item: CartItemProps) => item.productID.quantity > 0).length;
      setCart(res.data);
      setItemAmount(cartItemAmount);

      const soldout = res.data
        .map((group: CartProps) => {
          return group.products;
        })
        .flat()
        .filter((item: CartItemProps) => item.productID.quantity <= 0);
      setSoldoutProduct(soldout);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const singleCheckBoxHandler = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList((prevData) => {
        return prevData.filter((key) => {
          return key.productID._id !== value.productID._id;
        });
      });
    }
  };

  const groupCheckBoxHandler = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    const selectedGroup: CartProps | undefined = cart.find((group: CartProps) => {
      return group.store._id === value;
    });
    const selectedList = selectedGroup ? selectedGroup.products : [];
    const insertedList = [...checkedList, ...selectedList].sort();

    if (isSelected) {
      setCheckedList([...new Set(insertedList)]);
    } else {
      selectedList.forEach((id: CartItemProps) => {
        setCheckedList((prevData) => {
          return prevData.filter((key) => {
            return key !== id;
          });
        });
      });
    }
  };

  const allCheckBoxHandler = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    const insertedList = cart
      .map((group: CartProps) => {
        return group.products;
      })
      .flat();

    if (isSelected) {
      setCheckedList([...insertedList]);
    } else {
      setCheckedList([]);
    }
  };

  const getSumPrice = (checkedList: CartItemProps[]) => {
    return checkedList
      .map((item: CartItemProps) => {
        return item.productID.price * item.quantity;
      })
      .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
  };

  const isCheckedAll =
    checkedList.length !== 0 &&
    checkedList.length ===
      cart
        .map((group: CartProps) => {
          return group.products;
        })
        .flat().length
      ? true
      : false;

  interface Accumulator {
    [key: string]: {
      store: StoreProps;
      products: CartItemProps[];
    };
  }

  const groupByStore = Object.values(
    checkedList.reduce<Accumulator>((acc, product) => {
      const storeID = product.productID.storeID._id;
      if (!acc[storeID]) {
        acc[storeID] = {
          store: product.productID.storeID,
          products: [],
        };
      }
      acc[storeID].products.push(product);
      return acc;
    }, {}),
  );

  const handleDelete = async (productID: string | undefined, oldCheckList: CartItemProps[]) => {
    try {
      const newCheckedList = oldCheckList.filter((item: CartItemProps) => item.productID._id !== productID);
      const data: DeleteCartItemProps = { userID: user._id, productID: productID };
      await cartAPIs.deleteCartItem(data);
      displaySuccess('Product is deleted successfully');
      eventEmitter.emit('deleteProduct', newCheckedList);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const handleCheckout = () => {
    if (checkedList.length === 0) {
      showConfirm();
    } else {
      sessionStorage.setItem('checkout', JSON.stringify(groupByStore));
      navigate(`/${customerUrls.checkoutUrl}`);
    }
  };

  const handleQuantityChange = async (product: CartItemProps, value: number, oldCheckList: CartItemProps[]) => {
    try {
      const newCartItem = product;
      newCartItem.quantity = value;
      const newCheckedList = oldCheckList.filter((item: CartItemProps) => item.productID._id !== product.productID._id);
      eventEmitter.emit('updateItemQuantity', [...newCheckedList, newCartItem]);
      const data: NewCartItemProps = {
        userID: user._id,
        items: [{ productID: product?.productID._id, quantity: value }],
      };
      await cartAPIs.addCartItem(data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getUserCart();

    // Listen for buyNow event
    const buyNowListener = eventEmitter.addListener('buyNow', async (productID: string) => {
      const res = await cartAPIs.getCart();
      const selectedProduct = res.data
        .map((cart: CartProps) => {
          return cart.products;
        })
        .flat()
        .filter((item: CartItemProps) => item.productID._id === productID);
      setCheckedList(selectedProduct);
    });

    const deleteListener = eventEmitter.addListener('deleteProduct', (newCheckedList: CartItemProps[]) => {
      getUserCart();
      setCheckedList(newCheckedList);
    });

    return () => {
      deleteListener.remove();
      buyNowListener.remove();
    };
  }, []);

  useEffect(() => {
    setTotalPrice(getSumPrice(checkedList));

    const listener = eventEmitter.addListener('updateItemQuantity', (checkedList: CartItemProps[]) => {
      setTotalPrice(getSumPrice(checkedList));
    });
    return () => {
      listener.remove();
    };
  }, [checkedList]);

  return {
    checkedList,
    singleCheckBoxHandler,
    groupCheckBoxHandler,
    allCheckBoxHandler,
    isCheckedAll,
    handleCheckout,
    cart,
    itemAmount,
    totalPrice,
    handleDelete,
    handleQuantityChange,
    isLoading,
    soldoutProducts,
  };
};

export default useCart;
