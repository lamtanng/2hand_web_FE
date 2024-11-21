import { TableProps, Typography, Image, Space, Button, Table, Modal } from 'antd';
import defaultPic from '../../../assets/blob.jpg'
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { handleError } from '../../../utils/handleError';

export interface CustomTableColumns {
  picture: string;
  name: string;
  price: number;
  quantity: string;
  quality: string;
}

const data = [{
  picture: '',
  name: 'Product Name',
  price: 10000,
  quantity: 1,
  quality: "good",
}]

const ProductListPage = () => {
  const { confirm } = Modal;

  const showConfirm = (productID: string) => {
    confirm({
      title: 'Do you want to delete this product?',
      async onOk() {
        try {
        } catch (error) {
          handleError(error);
        } finally {
        }
      },
      onCancel() {},
    });
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Product Picture',
      dataIndex: 'picture',
      key: 'picture',
      width: '10%',
      render: (_, record) => (
        <div className="image-container">
          <Image width="100px" src='' fallback={defaultPic} preview={false} />
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
      render: (text: number) => <>{Intl.NumberFormat().format(text)} VND</>,
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
    <div>
      <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
        <Typography.Title level={2} className="m-0 mb-2">
          Product List
        </Typography.Title>
      </div>
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default ProductListPage;
