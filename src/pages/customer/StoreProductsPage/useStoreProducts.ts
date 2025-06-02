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

type SortField = 'price' | 'quantity' | 'quality' | null;
type SortOrder = 'ascend' | 'descend' | null;

const useStoreProducts = (profile: UserProps | undefined) => {
  const [store, setStore] = useState<StoreProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const { confirm } = Modal;

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  // Sort and filter states
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [qualityFilter, setQualityFilter] = useState<string[]>([]);

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
      let sort;

      if (sortField && sortOrder) {
        const sortDirection = sortOrder === 'ascend' ? 1 : -1;
        sort = JSON.stringify({ [sortField]: sortDirection });
      } else {
        sort = JSON.stringify({ createdAt: -1 });
      }

      const store = JSON.stringify(storeID);
      const res = await productAPIs.getAllProduct(page, limit, null, sort, null, null, null, store, undefined);

      if (res?.data.response.data) {
        let filteredData = [...res.data.response.data];

        // Apply quality filter if selected
        if (qualityFilter.length > 0) {
          filteredData = filteredData.filter((product) => qualityFilter.includes(product.quality));
        }

        setProduct(filteredData);
        setTotal(res.data.response.total);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle table sorting and filtering
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);

    if (sorter) {
      const field = sorter.field as SortField;
      const order = sorter.order as SortOrder;

      setSortField(field);
      setSortOrder(order);
    } else {
      setSortField(null);
      setSortOrder(null);
    }

    // Apply quality filter if present
    if (filters && filters.quality) {
      setQualityFilter(filters.quality);
    } else {
      setQualityFilter([]);
    }

    // Reload products with new sorting/filtering
    getProducts(pagination.current, pagination.pageSize, [store?._id]);
  };

  useEffect(() => {
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    getProducts(currentPage, pageSize, [store?._id]);

    const deleteProductListener = eventEmitter.addListener('deleteProduct', () => {
      getProducts(currentPage, pageSize, [store?._id]);
    });
    return () => {
      deleteProductListener.remove();
    };
  }, [store, currentPage, pageSize, sortField, sortOrder, qualityFilter]);

  return {
    isLoading,
    product,
    store,
    showConfirm,
    handleTableChange,
    pagination: {
      current: currentPage,
      pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50'],
    },
  };
};

export default useStoreProducts;
