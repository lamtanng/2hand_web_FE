import { useEffect, useState } from 'react';
import { ProductProps } from '../../../types/product.type';
import { handleError } from '../../../utils/handleError';
import { productAPIs } from '../../../apis/product.api';

// Export for type checking in the index component
export type TabKey = 'approved' | 'pending';
export type SortOrder = 'ascend' | 'descend' | null;
export type SortField = 'price' | 'quantity' | 'name' | null;

const useProductListPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>('approved');

  // Selected products for bulk operations
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [bulkActionLoading, setBulkActionLoading] = useState<boolean>(false);

  // Sort and filter states
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [qualityFilter, setQualityFilter] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await productAPIs.getAllProduct(
        1,
        1000, // Get all to handle client-side filtering
        null,
        null,
        null,
        null,
        null,
        undefined,
        undefined,
      );

      if (res.data.response && res.data.response.data) {
        setProducts(res.data.response.data);
        setTotal(res.data.response.data.length);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Approve product function
  const approveProduct = async (productId: string) => {
    setLoading(true);
    try {
      // Tìm sản phẩm cần approve
      const productToApprove = products.find((p) => p._id === productId);

      if (!productToApprove) {
        throw new Error('Product not found');
      }

      // Gọi API để update isApproved = true
      await productAPIs.updateProduct({
        _id: productId,
        name: productToApprove.name,
        description: productToApprove.description,
        image: productToApprove.image,
        price: productToApprove.price,
        quantity: productToApprove.quantity,
        quality: productToApprove.quality,
        cateID: productToApprove.cateID?._id,
        storeID: productToApprove.storeID?._id,
        weight: productToApprove.weight,
        height: productToApprove.height,
        width: productToApprove.width,
        length: productToApprove.length,
        // address: productToApprove.address,
        isApproved: true,
      });

      // Refresh danh sách sản phẩm sau khi approve
      await getAllProducts();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Bulk approve products
  const bulkApproveProducts = async (isApproved: boolean = true) => {
    if (selectedRowKeys.length === 0) return false;

    setBulkActionLoading(true);
    try {
      // Chuẩn bị dữ liệu cho API bulkApprove
      const productsToUpdate = selectedRowKeys.map((key) => ({
        _id: key.toString(),
        isApproved: isApproved,
      }));

      // Gọi API để bulk update trạng thái
      await productAPIs.approveProduct(productsToUpdate);

      // Refresh danh sách và reset selection
      await getAllProducts();
      setSelectedRowKeys([]);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Handle row selection change
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Filter products by approval status and other filters
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    // Filter by approval status based on active tab
    result = result.filter((product) =>
      activeTab === 'approved'
        ? product.isApproved === true
        : product.isApproved === false || product.isApproved === undefined,
    );

    // Apply quality filter if selected
    if (qualityFilter.length > 0) {
      result = result.filter((product) => qualityFilter.includes(product.quality));
    }

    // Apply sorting if needed
    if (sortField && sortOrder) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortField as keyof ProductProps];
        const bValue = b[sortField as keyof ProductProps];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'ascend' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    setFilteredProducts(result);
  }, [products, activeTab, qualityFilter, sortField, sortOrder]);

  // Handle table sorting
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
    if (filters.quality) {
      setQualityFilter(filters.quality);
    } else {
      setQualityFilter([]);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    products: filteredProducts,
    loading,
    activeTab,
    setActiveTab,
    handleTableChange,
    approveProduct,
    pagination: {
      current: currentPage,
      pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50'],
    },
    qualityFilter,
    setQualityFilter,
    // Row selection properties
    selectedRowKeys,
    onSelectChange,
    bulkApproveProducts,
    bulkActionLoading,
  };
};

export default useProductListPage;
