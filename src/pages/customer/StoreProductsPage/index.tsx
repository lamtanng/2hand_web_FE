import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, TableProps, Typography, Image, Space, Table, Tag, Tooltip } from 'antd';
import defaultPic from '../../../assets/blob.webp';
import useStoreProducts from './useStoreProducts';
import { Link } from 'react-router-dom';
import useAccountPage from '../AccountPage/useAccountPage';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import { ProductProps } from '../../../types/product.type';
import { useMemo } from 'react';

export interface CustomTableColumns {
  picture: string;
  name: string;
  price: number;
  quantity: string;
  quality: string;
}

const StoreProducts = () => {
  const { profile } = useAccountPage();
  const { product, showConfirm, isLoading, handleTableChange, pagination } = useStoreProducts(profile);

  // Create unique quality options for filter
  const qualityOptions = useMemo(() => {
    const qualities = Array.from(new Set(product.map((p) => p.quality)));
    return qualities.map((q) => ({ text: q, value: q }));
  }, [product]);

  const columns: TableProps<ProductProps>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_, record) => (
        <div className="flex items-center gap-3" style={{ maxWidth: 180 }}>
          <Image
            width={60}
            height={60}
            src={record.image?.[0]}
            fallback={defaultPic}
            preview={false}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
          />
          <div className="min-w-0 flex-1">
            {/* Product name with ellipsis */}
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-blue-600"
              title={record.name}
              style={{ maxWidth: '100%' }}
            >
              <Link to={`/${record.slug}`} className="hover:text-blue-800">
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
      key: 'price',
      dataIndex: 'price',
      width: '15%',
      sorter: true,
      render: (price: number) => <span className="font-semibold text-green-600">{formattedCurrency(price)}</span>,
    },
    {
      title: 'Stock',
      key: 'quantity',
      dataIndex: 'quantity',
      width: '10%',
      sorter: true,
      render: (quantity: number) => (
        <Tag color={quantity > 10 ? 'green' : quantity > 0 ? 'orange' : 'red'}>
          {quantity > 0 ? quantity : 'Out of stock'}
        </Tag>
      ),
    },
    {
      title: 'Quality',
      key: 'quality',
      dataIndex: 'quality',
      width: '15%',
      filters: qualityOptions,
      filterSearch: true,
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
          {record.isApproved ? <Tag color="success">Approved</Tag> : <Tag color="warning">Pending</Tag>}
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
          <Tooltip title="Delete Product">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => {
                showConfirm(record._id!);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div className="px-12 py-5">
      <Flex justify="space-between" align="center" className="mb-4">
        <Typography.Title level={3}>My Products</Typography.Title>
        <Link to={`/product/upload`}>
          <Button type="primary" className="h-10 text-base">
            <PlusOutlined /> Add new product
          </Button>
        </Link>
      </Flex>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <Divider className="my-4" />
        <Table
          loading={isLoading}
          dataSource={product}
          columns={columns}
          rowKey="_id"
          bordered
          size="middle"
          scroll={{ x: 'max-content' }}
          rowClassName="hover:bg-blue-50"
          className="overflow-hidden rounded-lg shadow"
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default StoreProducts;
