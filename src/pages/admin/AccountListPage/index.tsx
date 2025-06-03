import {
  TableProps,
  Typography,
  Space,
  Button,
  Table,
  Card,
  Input,
  Tag,
  Avatar,
  Tooltip,
  Badge,
  Flex,
  Dropdown,
  MenuProps,
} from 'antd';
import {
  EditOutlined,
  SearchOutlined,
  UserOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  FilterOutlined,
  MoreOutlined,
  UserAddOutlined,
  ReloadOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAccountListPage from './useAccountListPage';
import { UserProps } from '../../../types/user.type';
import { formattedName } from '../../../utils/formatName';
import dayjs from 'dayjs';
import { useState } from 'react';
import './AccountListPage.css';

export interface CustomTableColumns {
  _id: string | undefined;
  name: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  dateOfBirth: Date | undefined;
  createdAt: string;
  isActive: boolean | undefined;
  avatar?: string;
}

const AccountListPage = () => {
  const { users, isLoading, refreshUsers } = useAccountListPage();
  const [searchText, setSearchText] = useState<string>('');

  // Filter users based on search text
  const filteredUsers = users.filter((user) => {
    const fullName = formattedName(user).toLowerCase();
    const email = user?.email?.toLowerCase() || '';
    const phone = user?.phoneNumber?.toLowerCase() || '';
    const searchLower = searchText.toLowerCase();

    return fullName.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower);
  });

  const data: CustomTableColumns[] = filteredUsers.map((user: UserProps) => {
    return {
      _id: user?._id,
      name: formattedName(user),
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      dateOfBirth: user?.dateOfBirth,
      createdAt: dayjs(user?.createdAt?.toString()).format('DD/MM/YYYY'),
      isActive: user.isActive,
      avatar: user?.avatar,
    };
  });

  // Dropdown menu for actions
  const actionMenu: MenuProps = {
    items: [
      {
        key: '1',
        label: 'View Details',
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: 'Edit User',
        icon: <EditOutlined />,
      },
      {
        key: '3',
        label: 'Deactivate',
        icon: <CloseCircleFilled />,
        danger: true,
      },
    ],
  };

  const columns: TableProps['columns'] = [
    {
      title: 'User',
      key: 'user',
      width: '20%',
      render: (_, record) => (
        <Flex align="center" gap="middle">
          <Avatar size={40} icon={<UserOutlined />} src={record.avatar} className="border border-gray-200" />
          <div>
            <Typography.Text strong className="block">
              {record.name}
            </Typography.Text>
            <Typography.Text type="secondary" className="text-xs">
              ID: {record._id}
            </Typography.Text>
          </div>
        </Flex>
      ),
    },
    {
      title: 'Contact Information',
      key: 'contact',
      width: '25%',
      render: (_, record) => (
        <Space direction="vertical" size="small" className="w-full">
          <Typography.Text copyable>{record.email}</Typography.Text>
          <Typography.Text>{record.phoneNumber || 'Not provided'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Date of Birth',
      key: 'dateOfBirth',
      dataIndex: 'dateOfBirth',
      width: '15%',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : 'Not provided'),
    },
    {
      title: 'Joined',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '15%',
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (date) => <Tooltip title={dayjs(date).format('DD/MM/YYYY HH:mm:ss')}>{date}</Tooltip>,
    },
    {
      title: 'Status',
      key: 'isActive',
      dataIndex: 'isActive',
      width: '15%',
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) =>
        isActive ? (
          <Tag color="success" icon={<CheckCircleFilled />}>
            Active
          </Tag>
        ) : (
          <Tag color="error" icon={<CloseCircleFilled />}>
            Inactive
          </Tag>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small" className="bg-blue-500 hover:bg-blue-600" />
          </Link>
          <Dropdown menu={actionMenu} placement="bottomRight" arrow>
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className="account-list-page">
      <Card className="mb-6 border-0 shadow-md transition-all hover:shadow-lg">
        <Flex align="center" justify="space-between">
          <div>
            <Typography.Title level={2} className="m-0 mb-2 text-blue-600">
              Account Management
            </Typography.Title>
            <Typography.Text type="secondary">Manage user accounts, view details and edit permissions</Typography.Text>
          </div>
          <Space>
            {/* <Button icon={<UserAddOutlined />} type="primary" className="bg-blue-500 hover:bg-blue-600">
              Add New User
            </Button> */}
          </Space>
        </Flex>
      </Card>

      <Card className="border-0 shadow-md">
        <Flex justify="space-between" align="center" className="mb-4">
          <Input
            placeholder="Search by name, email or phone"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="max-w-md"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Space>
            <Tooltip title="Refresh data">
              <Button icon={<ReloadOutlined />} onClick={refreshUsers} loading={isLoading} />
            </Tooltip>
            <Tooltip title="Export data">
              <Button icon={<ExportOutlined />} />
            </Tooltip>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        </Flex>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
          scroll={{ x: 'max-content' }}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          bordered
          className="user-table"
        />
      </Card>
    </div>
  );
};

export default AccountListPage;
