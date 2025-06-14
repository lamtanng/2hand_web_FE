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
import {
  CalcShippingFeeRequestProps,
  CreateCODPaymentRequestProps,
  CreatedOrderProps,
  GetAvailableServiceRequestProps,
  NoteProps,
} from '../../../types/http/order.type';
import { orderAPIs } from '../../../apis/order.api';
import { StoreProps } from '../../../types/store.type';
import { cartAPIs } from '../../../apis/cart.api';
import { ServiceProps, ShipmentProps } from '../../../types/shipment.type';
import { MoMoPaymentItemsProps } from '../../../types/http/momoPayment.type';
import { paymentMethodAPIs } from '../../../apis/paymentMethod.api';
import { PaymentMethodProps } from '../../../types/paymentMethod.type';

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
  const [note, setNote] = useState<NoteProps[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodProps>();

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
        const newService: ServiceProps = { store: store, services: res.data };
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

  const getPaymentMethod = async () => {
    try {
      const res = await paymentMethodAPIs.getAllMethod();
      setPaymentMethods(res.data.methods);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

  useEffect(() => {
    if (paymentMethods.length !== 0) {
      setSelectedMethod(paymentMethods.find((item: PaymentMethodProps) => item.name === 'Cash on delivery'));
    }
  }, [paymentMethods]);

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
        setGroupedShipment(groupByStore);
      }
    }
  }, [allShipmentsFetched, shipment]);

  useEffect(() => {
    if (groupedShipment.length === checkoutItems.length) {
      groupedShipment.forEach((group: any) => {
        const shipment = group.shipment.find((item: any) => item.service_type_id === 2)
          ? group.shipment.find((item: any) => item.service_type_id === 2)
          : group.shipment[0];
        setSelectedShipment((prev) => [
          ...prev,
          {
            store: group.store,
            service_type_id: shipment.service_type_id,
            total: shipment.total,
          },
        ]);
      });
    }
  }, [groupedShipment.length]);

  useEffect(() => {
    const shipmentChangeListener = eventEmitter.addListener('shipmentChange', (shipment: ShipmentProps) => {
      const newArr = selectedShipment.filter((item: ShipmentProps) => item.store._id !== shipment.store._id);
      setSelectedShipment([...newArr, shipment]);
    });
    return () => {
      shipmentChangeListener.remove();
    };
  }, [selectedShipment]);

  useEffect(() => {
    const addNoteListener = eventEmitter.addListener('addNote', (newNote: NoteProps) => {
      const newArr = note.filter((item: NoteProps) => item.store._id !== newNote.store._id);
      setNote([...newArr, newNote]);
    });
    return () => {
      addNoteListener.remove();
    };
  }, [note]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const data: CreateCODPaymentRequestProps = {
        userID: user._id,
        receiverAddress: value,
        total:
          total + selectedShipment.reduce((accumulator: number, item: ShipmentProps) => accumulator + item.total, 0),
        paymentMethodID: selectedMethod?._id,
        orders: checkoutItems.map((item: CartProps) => {
          const orderNote =
            note.length !== 0 && note?.find((note: NoteProps) => note.store._id === item.store._id)?.note
              ? note.find((note: NoteProps) => note.store._id === item.store._id)?.note.trim()
              : '';
          return {
            storeID: item.store._id,
            total: item.products
              .map((item: CartItemProps) => {
                return item.productID.price * item.quantity;
              })
              .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0),
            shipmentCost: selectedShipment.find((shipment: ShipmentProps) => shipment.store._id === item.store._id)
              .total,
            note: orderNote,
            items: item.products.map((item: CartItemProps) => {
              return {
                id: item.productID._id,
                name: item.productID.name,
                quantity: item.quantity,
                totalPrice: item.quantity * item.productID.price,
                description: item.productID.description,
              } as MoMoPaymentItemsProps;
            }),
          } as CreatedOrderProps;
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

        navigate(`/intermediary`);
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
      if (!profile?.firstName || !profile.lastName || profile.address?.length === 0) {
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
    isLoading,
    setNote,
    note,
    paymentMethods,
    selectedMethod,
    setSelectedMethod,
  };
};
export default useCheckoutPage;
