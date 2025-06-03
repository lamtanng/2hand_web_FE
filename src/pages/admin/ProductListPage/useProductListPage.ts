import { useEffect, useState } from 'react';
import { productAPIs } from '../../../apis/product.api';
import { useNotification } from '../../../context/NotificationContext';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { ProductProps } from '../../../types/product.type';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

// Export for type checking in the index component
export type TabKey = 'approved' | 'pending';
export type SortOrder = 'ascend' | 'descend' | null;
export type SortField = 'price' | 'quantity' | 'name' | null;

// Interface for tracking product approval status
interface ApprovalStatusMap {
  [productId: string]: 'processing' | 'done';
}

// Interface for product filters
interface ProductFilterParams {
  page?: number;
  limit?: number;
  quality?: string | null;
  sort?: SortField | null;
  order?: SortOrder | null;
  isApproved?: boolean;
  search?: string | null;
  price?: string | null;
  cateID?: string | null;
  storeID?: string | undefined;
}

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

  const { user } = useAppSelector(loginSelector);

  // For tracking approval status
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatusMap>({});

  // Get notification context to access socket events
  const { subscribeToProductApproval } = useNotification();

  // Subscribe to product approval events
  useEffect(() => {
    // Only subscribe for admin users
    const isAdmin = user?.roleID?.includes('670d2db6d696affd52e661c2');
    if (!isAdmin) return;

    const unsubscribe = subscribeToProductApproval((data) => {
      setApprovalStatus((prev) => ({
        ...prev,
        [data._id]: data.status,
      }));

      // If status is 'done', refresh the product list
      if (data.status === 'done') {
        getAllProducts();
      }
    });

    return unsubscribe;
  }, [user]);

  /**
   * Fetches products with filters and pagination
   * @param customParams Optional custom parameters to override the current state
   */
  const getAllProducts = async (customParams?: Partial<ProductFilterParams>) => {
    setLoading(true);
    try {
      // Default params from current state
      const defaultParams: ProductFilterParams = {
        page: currentPage,
        limit: pageSize,
        quality: qualityFilter.length > 0 ? qualityFilter.join(',') : null,
        sort: sortField,
        order: sortOrder,
        isApproved: activeTab === 'approved',
        search: null,
        price: null,
        cateID: null,
        storeID: undefined,
      };

      // Merge with custom params if provided
      const params = { ...defaultParams, ...customParams };

      const res = await productAPIs.getAllProduct(
        params.page || 1,
        params.limit || 10,
        params.search || null,
        params.sort || null,
        params.quality || null,
        params.price || null,
        params.cateID || null,
        params.storeID,
        params.isApproved,
      );

      setProducts(res.data.products);
      setTotal(res.data.pagination.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load products when component mounts or filters change
  useEffect(() => {
    getAllProducts();
  }, [activeTab, currentPage, pageSize, qualityFilter.join(','), sortField, sortOrder]);

  // Approve product function
  const approveProduct = async (productId: string) => {
    try {
      // Update local approval status to 'processing' while waiting for BE response
      setApprovalStatus((prev) => ({
        ...prev,
        [productId]: 'processing',
      }));

      // Tìm sản phẩm cần approve
      const productToApprove = products.find((p) => p._id === productId);

      if (!productToApprove) {
        throw new Error('Product not found');
      }

      // Gọi API để update isApproved = true
      const res = await productAPIs.updateProduct({
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
        isApproved: true,
      });

      // Product is already updated via socket, but we'll make sure
      if (!approvalStatus[productId] || approvalStatus[productId] !== 'done') {
        // Update local state if needed
        setProducts((prev) => prev.map((p) => (p._id === productId ? { ...p, isApproved: true } : p)));
      }

      return true;
    } catch (error) {
      console.error('Failed to approve product:', error);
      // Clear processing status
      setApprovalStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[productId];
        return newStatus;
      });
      return false;
    }
  };

  // Bulk approve products
  const bulkApproveProducts = async (isApproved: boolean = true) => {
    if (selectedRowKeys.length === 0) return false;

    setBulkActionLoading(true);
    try {
      // Mark all selected products as processing
      const newStatus: ApprovalStatusMap = {};
      selectedRowKeys.forEach((key) => {
        newStatus[key.toString()] = 'processing';
      });
      setApprovalStatus((prev) => ({ ...prev, ...newStatus }));

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
      console.error('Failed to bulk approve products:', error);
      return false;
    } finally {
      setBulkActionLoading(false);
    }
  };

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
    if (pagination.current) setCurrentPage(pagination.current);
    if (pagination.pageSize) setPageSize(pagination.pageSize);

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

  // Public API của hook
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
    // Approval status
    approvalStatus,
    // Expose the improved getAllProducts function
    getAllProducts,
  };
};

export default useProductListPage;
