import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { UserProps } from '../../../types/user.type';
import { StoreProps } from '../../../types/store.type';
import { ProductProps } from '../../../types/product.type';
import { productAPIs } from '../../../apis/product.api';
import { displaySuccess } from '../../../utils/displayToast';
import eventEmitter from '../../../utils/eventEmitter';
import { handleError } from '../../../utils/handleError';
import { storeAPIs } from '../../../apis/store.api';

const useStoreProducts = (profile: UserProps | undefined) => {
  const [store, setStore] = useState<StoreProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const { confirm } = Modal;

  const showConfirm = (productID: string) => {
    confirm({
      title: 'Do you want to delete this product?',
      async onOk() {
        try {
          setIsLoading(true);
          const res = await productAPIs.deleteProduct(productID);
          console.log(res);
          displaySuccess('Product is deleted successfully.');
          eventEmitter.emit('deleteProduct');
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
        }
      },
      onCancel() {},
    });
  };

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getProducts = async (page: number, limit: number, storeID: (string | undefined)[]) => {
    try {
      setIsLoading(true);
      const sort = JSON.stringify({createdAt: -1});
      const store = JSON.stringify(storeID);
      const res = await productAPIs.getAllProduct(
        page,
        limit,
        undefined,
        sort,
        undefined,
        undefined,
        undefined,
        store,
      );
      setProduct(res?.data.response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    getProducts(1, 10, [store?._id]);

    const deleteProductListener = eventEmitter.addListener('deleteProduct', () => {
      getProducts(1, 10, [store?._id]);
    });
    return () => {
      deleteProductListener.remove();
    };
  }, [store]);

  return {
    isLoading,
    product,
    store,
    showConfirm,
  };
};

export default useStoreProducts;
