import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Dropdown, Flex, MenuProps } from 'antd';
import { UserProps } from '../../../../../types/user.type';
import useUserInfo from './useUserInfo';
import { Link } from 'react-router-dom';
import { customerUrls } from '../../../../../constants/urlPaths/customer/customerUrls';
import { accountUrls } from '../../../../../constants/urlPaths/customer/accountUrls';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.profileUrl}`}>My Profile</Link>,
  },
  {
    key: '2',
    label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.puchasesUrl}`}>My Orders</Link>,
  },
  {
    key: '3',
    label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.reviewUrl}`}>My Reviews</Link>,
  },
  {
    key: '4',
    label: <Link to={`logout`}>Logout</Link>,
  },
];

const UserInfoGroup = ({ user }: { user: UserProps }) => {
  const { itemAmount, profile } = useUserInfo(user);
  const userID = profile && profile._id && btoa(profile._id);
  const isSeller = profile?.roleID?.filter((role: any) => role === "670d2db6d696affd52e661c3").length !== 0 ? true : false;
  const actionLink = isSeller ? `/product/upload` : `/${customerUrls.storeRegisterUrl}`
  return (
    <Flex gap={'large'} justify="center" align="center">
      <Dropdown menu={{ items }}>
        <Link to={`/user/${userID}`}>
          <Flex gap={'small'} align="center">
            <Avatar size="large" icon={<UserOutlined />} />
            <p className="m-0 hidden font-sans xl:inline">
              {profile?.firstName && profile?.lastName ? `${profile?.firstName} ${profile?.lastName}` : profile?.email}
            </p>
          </Flex>
        </Link>
      </Dropdown>
      <Divider type="vertical" className="m-0" />
      <Link to={`/${customerUrls.cartUrl}`}>
        <div className="relative h-fit">
          <ShoppingCartOutlined className="m-0 text-lg" />
          <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">{itemAmount}</p>
        </div>
      </Link>
      {/* <div className="relative h-fit">
        <BellOutlined className="m-0 text-lg" />
        <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">0</p>
      </div> */}
      <Link to={actionLink}>
        <Button type="primary" className="hidden px-10 text-base md:inline">
          Sell a product
        </Button>
      </Link>
    </Flex>
  );
};

export default UserInfoGroup;
