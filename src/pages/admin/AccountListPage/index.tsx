import { Modal, TableProps, Typography, Space, Button, Table } from 'antd';
import { handleError } from '../../../utils/handleError';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useAccountListPage from './useAccountListPage';
import { UserProps } from '../../../types/user.type';
import { formattedName } from '../../../utils/formatName';
import dayjs from 'dayjs';

export interface CustomTableColumns {
  _id: string | undefined;
  name: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  dateOfBirth: Date | undefined;
  createdAt: string;
  isActive: boolean | undefined;
}

const AccountListPage = () => {
  const { users } = useAccountListPage();

  console.log(users)

  const data: CustomTableColumns[] = users.map((user: UserProps) => {
    return {
      _id: user?._id,
      name: formattedName(user),
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      dateOfBirth: user?.dateOfBirth,
      createdAt: dayjs(user?.createdAt?.toString()).format('DD/MM/YYYY'),
      isActive: user.isActive,
    };
  });

  const columns: TableProps['columns'] = [
    {
      title: `User ID`,
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      responsive: ['xs', 'md'],
    },
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
    },
    {
      title: 'Date of birth',
      key: 'dateOfBirth',
      dataIndex: 'email',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Joined in',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '10%',
      render: (text) => <>{text}</>,
      responsive: ['xs', 'md'],
    },
    {
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
