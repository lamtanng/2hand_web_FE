import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, TableProps, Typography, Image, Space, Table } from 'antd';
import defaultPic from '../../../assets/blob.webp';
import useStoreProducts from './useStoreProducts';
import { Link } from 'react-router-dom';
import useAccountPage from '../AccountPage/useAccountPage';
import { formattedCurrency } from '../../../utils/formattedCurrency';

export interface CustomTableColumns {
  picture: string;
  name: string;
  price: number;
  quantity: string;
  quality: string;
}

const StoreProducts = () => {
  const { profile } = useAccountPage();
  const { product, showConfirm, isLoading } = useStoreProducts(profile);
  const columns: TableProps['columns'] = [
    {
      title: 'Product Picture',
      dataIndex: 'picture',
      key: 'picture',
      width: '10%',
      render: (_, record) => (
        <div className="image-container">
          <Image width="100px" src={record.image[0]} fallback={defaultPic} preview={false} />
        </div>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text, record) => <Link to={`/${record.slug}`} >{text}</Link>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'Product Price',
      key: 'price',
      dataIndex: 'price',
      width: '10%',
      render: (text: number) => <>{formattedCurrency(text)}</>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'In Stock',
      key: 'quantity',
      dataIndex: 'quantity',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Quality',
      key: 'quality',
      dataIndex: 'quality',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Action',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <Space size="middle">
          <Link to={record._id}>
            <Button variant="filled" color="primary">
              <EditOutlined />
            </Button>
          </Link>
          <Button
            variant="filled"
            color="danger"
            onClick={() => {
              showConfirm(record._id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      responsive: ['xs', 'md'],
    },
  ];
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={3}>All Products</Typography.Title>
          <Link to={`/product/upload`}>
          <Button type="primary" className="h-10 text-base">
            <PlusOutlined /> Add new product
          </Button>
          </Link>
        </Flex>
      </div>
      <Divider />
      <Table loading={isLoading} dataSource={product} columns={columns} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default StoreProducts;
