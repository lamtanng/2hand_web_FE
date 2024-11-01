import { BellOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Flex } from 'antd';
import { UserProps } from '../../../../../types/user.type';

const UserInfoGroup = ({ user }: { user: UserProps }) => {
  return (
    <Flex gap={'large'} justify="center" align="center">
      <Flex gap={'small'} align="center">
        <Avatar size="large" icon={<UserOutlined />} />
        <p className="hidden xl:inline m-0">{user.firstName ? `${user.firstName} ${user.lastName}` : user.email}</p>
      </Flex>
      <Divider type="vertical" className="m-0" />
      <div className="relative h-fit">
        <ShoppingCartOutlined className="m-0 text-lg" />
        <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">0</p>
      </div>
      <div className="relative h-fit">
        <BellOutlined className="m-0 text-lg" />
        <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">0</p>
      </div>
      <Button type="primary" className="hidden h-10 text-base md:inline">
        Sell a product
      </Button>
    </Flex>
  );
};

export default UserInfoGroup;
