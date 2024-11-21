import { Modal, TableProps, Typography, Space, Button, Table } from 'antd';
import { handleError } from '../../../utils/handleError';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export interface CustomTableColumns {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  createdAt: Date;
  isActive: boolean;
}

const data = [{
  name: 'User Name',
  email: "example@email.com",
  phoneNumber: '0987654321',
  dateOfBirth: '2003-11-13',
  createdAt: '2024-11-20',
  isActive: true,
}]

const AccountListPage = () => {

  const { confirm } = Modal;

  const showConfirm = (userID: string) => {
    confirm({
      title: 'Do you want to delete this user?',
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
      title: `User's Name`,
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      width: '10%',
      responsive: ['xs', 'md'],
    },{
      title: 'Date of birth',
      key: 'dateOfBirth',
      dataIndex: 'email',
      width: '10%',
      responsive: ['xs', 'md'],
    },{
      title: 'Joined in',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '10%',
      responsive: ['xs', 'md'],
    },{
      title: 'Active',
      key: 'isActive',
      dataIndex: 'isAvtive',
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
          Account List
        </Typography.Title>
      </div>
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default AccountListPage;
