import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { handleError } from '../../../utils/handleError';
import { UserProps } from '../../../types/user.type';
import { userAPIs } from '../../../apis/user.api';
import eventEmitter from '../../../utils/eventEmitter';
import { AddressProps } from '../../../types/address.type';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import { CartItemProps, CartProps } from '../../../types/cart.type';

const useCheckoutPage = (totalShip: number, checkoutItems: CartProps[]) => {
  const { user } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProps>();
  const [value, setValue] = useState<AddressProps>();

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Please update your information before checking out.',
      onOk() {
        navigate(`/${accountUrls.accountUrl}/${accountUrls.profileUrl}`);
      },
      onCancel() {
        navigate(-1);
      },
    });
  };

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handlePlaceOrder = () => {
    const data = {
      userID: user._id,
      receiverAddress: value,
      orders: checkoutItems.map((item: CartProps) => {
        return {
          storeID: item.store._id,
          total: item.products
            .map((item: CartItemProps) => {
              return item.productID.price * item.quantity;
            })
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0),
          items: item.products.map((item: CartItemProps) => {
            return {
              id: item.productID._id,
              name: item.productID.name,
              quantity: item.quantity,
              totalPrice: item.quantity * item.productID.price,
              description: item.productID.description,
            };
          }),
        };
      }),
    };
    console.log(data);
  };

  useEffect(() => {
    getUserByID(user._id);

    const addAddressListener = eventEmitter.addListener('addAddress', () => {
      getUserByID(user._id);
    });
    const updateAddressListener = eventEmitter.addListener('updateAddress', () => {
      getUserByID(user._id);
    });

    return () => {
      addAddressListener.remove();
      updateAddressListener.remove();
    };
  }, []);

  // useEffect(() => {
  //   const shipmentListener = eventEmitter.addListener('selectShipment', (shipment: any) => {
  //     totalShip = totalShip + shipment.total;
  //     console.log(totalShip)
  //     console.log(shipment);
  //   });

  //   return () => {
  //     shipmentListener.remove();
  //   };
  // }, [totalShip]);

  useEffect(() => {
    if (profile) {
      if (!profile?.phoneNumber) {
        showConfirm();
      }
    }
  }, [profile]);

  return {
    profile,
    value,
    setValue,
    handlePlaceOrder,
    totalShip,
  };
};
export default useCheckoutPage;
