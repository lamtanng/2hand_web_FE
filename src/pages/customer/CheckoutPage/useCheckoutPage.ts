import { useCallback, useEffect, useState } from 'react';
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
import { CalcShippingFeeRequestProps, GetAvailableServiceRequestProps } from '../../../types/http/order.type';
import { orderAPIs } from '../../../apis/order.api';
import { StoreProps } from '../../../types/store.type';
import { cartAPIs } from '../../../apis/cart.api';
import { ServiceProps, ShipmentProps } from '../../../types/shipment.type';

const useCheckoutPage = (checkoutItems: CartProps[], total: number) => {
  const { user } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProps>();
  const [value, setValue] = useState<AddressProps>();
  const [service, setService] = useState<ServiceProps[]>([]);
  const [shipment, setShipment] = useState<ShipmentProps[]>([]);
  const [allShipmentsFetched, setAllShipmentsFetched] = useState(false);
  const [groupedShipment, setGroupedShipment] = useState<any[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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

  const getAvailableService = useCallback(
    async (store: StoreProps) => {
      try {
        const data: GetAvailableServiceRequestProps = {
          shop_id: Number(store.ghnStoreID),
          from_district: store.address[0].district?.DistrictID,
          to_district: value?.district?.DistrictID,
        };
        const res = await orderAPIs.getService(data);
        const newService: ServiceProps = { store: store, services: res.data }
        setService((prevService) => [...prevService, newService]);
      } catch (error) {
        handleError(error);
      } finally {
      }
    },
    [value?.district?.DistrictID],
  );

  useEffect(() => {
    if (value) {
      checkoutItems.forEach((item: CartProps) => {
        getAvailableService(item.store);
      });
    }
  }, [value, getAvailableService]);

  const calcShippingFeeByStore = async (service_type: number, store: StoreProps, products: CartItemProps[]) => {
    try {
      const data: CalcShippingFeeRequestProps = {
        shopid: Number(store.ghnStoreID),
        weight: 500,
        service_type_id: service_type,
        from_district_id: store.address[0].district?.DistrictID,
        from_ward_code: store.address[0].ward?.WardCode,
        to_district_id: value?.district?.DistrictID,
        to_ward_code: value?.ward?.WardCode,
        items: products.map((item: CartItemProps) => ({
          name: item.productID.name,
          quantity: item.quantity,
          weight: item.productID.weight,
          height: item.productID.height,
          length: item.productID.length,
          width: item.productID.width,
        })),
      };

      const res = await orderAPIs.calcShippingFee(data);

      setShipment((prevShipment) => [
        ...prevShipment,
        {
          store: store,
          service_type_id: service_type,
          total: res.data.total,
        },
      ]);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  useEffect(() => {
    if (service.length === checkoutItems.length) {
      checkoutItems.forEach((cart: CartProps) => {
        const storeService = service.find((service: ServiceProps) => service.store._id === cart.store._id);
        storeService?.services.forEach((item: any) => {
          calcShippingFeeByStore(item.service_type_id, storeService.store, cart.products);
        });
      });

      setAllShipmentsFetched(true);
    }
  }, [service]);

  interface Accumulator {
    [key: string]: {
      store: StoreProps;
      shipment: ShipmentProps[];
    };
  }

  const groupByStore = Object.values(
    shipment.reduce<Accumulator>((acc, shipment) => {
      const storeID = shipment.store._id;
      if (!acc[storeID]) {
        acc[storeID] = {
          store: shipment.store,
          shipment: [],
        };
      }
      acc[storeID].shipment.push(shipment);
      return acc;
    }, {}),
  );

  useEffect(() => {
    if (allShipmentsFetched === true) {
      if (groupByStore.length === checkoutItems.length) {
        console.log('group by store:', groupByStore);
        setGroupedShipment(groupByStore);
      }
    }
  }, [allShipmentsFetched, shipment]);

  useEffect(() => {
    if (groupedShipment.length === checkoutItems.length) {
      groupedShipment.forEach((item: any) => {
        setSelectedShipment((prev) => [
          ...prev,
          {
            store: item.store,
            service_type_id: item.shipment[0].service_type_id,
            total: item.shipment[0].total,
          },
        ]);
      });
    }
  }, [groupedShipment.length]);

  useEffect(() => {
    const shipmentChangeListener = eventEmitter.addListener('shipmentChange', (shipment: ShipmentProps) => {
      console.log(shipment);
      const newArr = selectedShipment.filter((item: ShipmentProps) => item.store._id !== shipment.store._id);
      console.log(newArr);
      setSelectedShipment([...newArr, shipment]);
    });
    return () => {
      shipmentChangeListener.remove();
    };
  }, [selectedShipment]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const data = {
        userID: user._id,
        receiverAddress: value,
        total: total + selectedShipment.reduce((accumulator: number, item: ShipmentProps) => accumulator + item.total, 0),
        paymentMethodID: '67029099359e957a9f4ee1f3',
        orders: checkoutItems.map((item: CartProps) => {
          return {
            storeID: item.store._id,
            total: item.products
              .map((item: CartItemProps) => {
                return item.productID.price * item.quantity;
              })
              .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0),
            shipmentCost: selectedShipment.find((shipment: ShipmentProps) => shipment.store._id === item.store._id).total,
            note: '',
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

      const order = await orderAPIs.placeOrder(data);

      if (order.status === 200) {
        const res = await cartAPIs.getCart();
        const cart = res.data
          .map((group: CartProps) => {
            return group.products;
          })
          .flat();

        const orderedProduct = checkoutItems
          .map((item: CartProps) => {
            return item.products;
          })
          .flat();

        cart.forEach((cartItem: CartItemProps) => {
          orderedProduct.forEach(async (orderedItem: CartItemProps) => {
            if (orderedItem.productID._id === cartItem.productID._id) {
              await cartAPIs.deleteCartItem({ userID: user._id, productID: cartItem.productID._id });
            }
          });
        });

        navigate(`/${accountUrls.accountUrl}/${accountUrls.orderUrl}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
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
    shipment,
    selectedShipment,
    setSelectedShipment,
    isLoading
  };
};
export default useCheckoutPage;
