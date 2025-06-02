import { TableProps, Typography, Image, Space, Button, Table, Tag, Tabs, Badge, Tooltip, message } from 'antd';
import defaultPic from '../../../assets/blob.webp';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  SearchOutlined,
  CheckOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import useProductListPage, { TabKey } from './useProductListPage';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import { ProductProps } from '../../../types/product.type';
import { useMemo, useState } from 'react';
import type { TabsProps } from 'antd';

const ProductListPage = () => {
  const {
    products,
    loading,
    activeTab,
    setActiveTab,
    handleTableChange,
    pagination,
    approveProduct,
    // Row selection properties
    selectedRowKeys,
    onSelectChange,
    bulkApproveProducts,
    bulkActionLoading,
  } = useProductListPage();

  const [activeApprovalId, setActiveApprovalId] = useState<string | null>(null);

  // Create unique quality options for filter
  const qualityOptions = useMemo(() => {
    const qualities = Array.from(new Set(products.map((p) => p.quality)));
    return qualities.map((q) => ({ text: q, value: q }));
  }, [products]);

  const handleApproveProduct = async (productId: string) => {
    setActiveApprovalId(productId);
    try {
      const success = await approveProduct(productId);
      if (success) {
        message.success('Product approved successfully');
      } else {
        message.error('Failed to approve product');
      }
    } catch (error) {
      message.error('An error occurred while approving the product');
      console.error(error);
    } finally {
      setActiveApprovalId(null);
    }
  };

  // Xử lý bulk approve
  const handleBulkApprove = async () => {
    try {
      const success = await bulkApproveProducts(true); // Approve với isApproved = true
      if (success) {
        message.success(`Successfully updated ${selectedRowKeys.length} products`);
      } else {
        message.error('Failed to update products');
      }
    } catch (error) {
      message.error('An error occurred while updating products');
      console.error(error);
    }
  };

  // Cấu hình row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: TableProps<ProductProps>['columns'] = [
    {
      title: 'Product',
      key: 'product',
      width: 200,
      ellipsis: true,
      render: (_, record) => (
        <div className="flex items-center gap-3" style={{ maxWidth: 180 }}>
          {/* Image container - fixed width */}
          <div className="mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={record.image[0]}
              fallback={defaultPic}
              preview={false}
              className="h-full w-full object-cover"
              alt={record.name}
            />
          </div>

          {/* Text container - takes remaining width with overflow control */}
          <div className="min-w-0 flex-1">
            {/* Product name with ellipsis */}
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-blue-600"
              title={record.name}
              style={{ maxWidth: '100%' }}
            >
              <Link to={`/${record.slug}`} target="_blank" className="hover:text-blue-800">
                {record.name}
              </Link>
            </div>

            {/* Product ID with ellipsis */}
            <div className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
              ID: {record._id}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      width: '15%',
      render: (price: number) => <span className="font-semibold text-green-600">{formattedCurrency(price)}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: true,
      width: '10%',
      render: (quantity: number) => (
        <Tag color={quantity > 10 ? 'green' : quantity > 0 ? 'orange' : 'red'}>
          {quantity > 0 ? quantity : 'Out of stock'}
        </Tag>
      ),
    },
    {
      title: 'Quality',
      dataIndex: 'quality',
      key: 'quality',
      filters: qualityOptions,
      filterSearch: true,
      width: '15%',
      render: (quality: string) => {
        let color = 'default';
        if (quality === 'new') color = 'green';
        else if (quality === 'like new') color = 'cyan';
        else if (quality === 'good') color = 'blue';
        else if (quality === 'average') color = 'orange';
        else if (quality === 'old') color = 'red';

        return <Tag color={color}>{quality.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      width: '15%',
      render: (_, record) => (
        <div>
          {record.isApproved ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Approved
            </Tag>
          ) : (
            <Tag icon={<ClockCircleOutlined />} color="warning">
              Pending
            </Tag>
          )}
          {record.isSoldOut && <Tag color="red">Sold Out</Tag>}
          {!record.isActive && <Tag color="default">Inactive</Tag>}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Link to={`/${record.slug}`}>
              <Button type="primary" ghost icon={<EyeOutlined />} size="small" />
            </Link>
          </Tooltip>
          <Tooltip title="Edit Product">
            <Link to={record._id!}>
              <Button type="default" icon={<EditOutlined />} size="small" />
            </Link>
          </Tooltip>
          {activeTab === 'pending' && !record.isApproved && (
            <Tooltip title="Approve Product">
              <Button
                type="primary"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => handleApproveProduct(record._id!)}
                loading={loading && record._id === activeApprovalId}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // Hiển thị nút Save All khi có items được chọn
  const TableHeader = () => (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <span className="mr-2">{selectedRowKeys.length} items selected</span>
        {selectedRowKeys.length > 0 && (
          <Button type="primary" icon={<SaveOutlined />} onClick={handleBulkApprove} loading={bulkActionLoading}>
            Save All
          </Button>
        )}
      </div>
      <div>
        <Typography.Text type="secondary">
          Use checkboxes to select multiple products and update them at once
        </Typography.Text>
      </div>
    </div>
  );

  const items: TabsProps['items'] = [
    {
      key: 'approved',
      label: (
        <span>
          Approved Products{' '}
          <Badge count={products.filter((p) => p.isApproved === true).length} style={{ backgroundColor: '#52c41a' }} />
        </span>
      ),
      children: (
        <>
          <TableHeader />
          <Table<ProductProps>
            rowSelection={rowSelection}
            dataSource={products}
            columns={columns}
            rowKey="_id"
            loading={loading}
            onChange={handleTableChange}
            pagination={pagination}
            bordered
            size="middle"
            scroll={{ x: 'max-content' }}
            rowClassName="hover:bg-blue-50"
            className="overflow-hidden rounded-lg shadow"
          />
        </>
      ),
    },
    {
      key: 'pending',
      label: (
        <span>
          Pending Approval{' '}
          <Badge count={products.filter((p) => p.isApproved !== true).length} style={{ backgroundColor: '#faad14' }} />
        </span>
      ),
      children: (
        <>
          <TableHeader />
          <Table<ProductProps>
            rowSelection={rowSelection}
            dataSource={products}
            columns={columns}
            rowKey="_id"
            loading={loading}
            onChange={handleTableChange}
            pagination={pagination}
            bordered
            size="middle"
            scroll={{ x: 'max-content' }}
            rowClassName="hover:bg-blue-50"
            className="overflow-hidden rounded-lg shadow"
          />
        </>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  return (
    <div>
      <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
        <Typography.Title level={2} className="m-0 mb-2 text-blue-600">
          Product Management
        </Typography.Title>
        <Typography.Text type="secondary">Manage and review all products in the system</Typography.Text>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <Tabs activeKey={activeTab} items={items} onChange={handleTabChange} type="card" className="mb-4" />
      </div>
    </div>
  );
};

export default ProductListPage;
