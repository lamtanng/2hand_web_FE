import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, TableProps, Typography, Image, Space, Table } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';

const data = [{
  picture: '',
  name: 'product A',
  price: 5000,
  quantity: 1,
  quality: 'new',
}];

export interface CustomTableColumns {
  picture: string;
  name: string;
  price: number;
  quantity: string;
  quality: string;
}

const StoreProducts = () => {
  const columns: TableProps['columns'] = [
    {
      title: 'Product Picture',
      dataIndex: 'picture',
      key: 'picture',
      width: '15%',
      render: () => (
        <div className="image-container">
          <Image width="100px" src="" fallback={defaultPic} preview={false} />
        </div>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'Product Price',
      key: 'price',
      dataIndex: 'price',
      render: (text: number) => <>{Intl.NumberFormat().format(text)} VND</>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'In Stock',
      key: 'quantity',
      dataIndex: 'quantity',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Quality',
      key: 'quality',
      dataIndex: 'quality',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (_) => (
        <Space size="middle">
          <Button variant='filled' color='primary'>
            <EditOutlined />
          </Button>
          <Button variant='filled' color='danger'>
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
          <Typography.Title level={3}>My Addresses</Typography.Title>
          <Button type="primary" className="h-10 text-base">
            <PlusOutlined /> Add new product
          </Button>
        </Flex>
      </div>
      <Divider />
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default StoreProducts;
