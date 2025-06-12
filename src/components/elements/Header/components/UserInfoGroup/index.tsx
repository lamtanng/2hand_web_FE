import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Dropdown, Flex, MenuProps, Typography, Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authAPIs } from '../../../../../apis/auth.api';
import { accountUrls } from '../../../../../constants/urlPaths/customer/accountUrls';
import { customerUrls } from '../../../../../constants/urlPaths/customer/customerUrls';
import { useAppDispatch } from '../../../../../redux/hooks';
import { deleteAuth } from '../../../../../redux/slices/login.slice';
import { UserProps } from '../../../../../types/user.type';
import { formattedName } from '../../../../../utils/formatName';
import { handleError } from '../../../../../utils/handleError';
import NotificationBell from '../../../Notification';
import useUserInfo from './useUserInfo';

const UserInfoGroup = ({ user }: { user: UserProps }) => {
  const { itemAmount, profile } = useUserInfo(user);
  const isSeller =
    profile?.roleID?.filter((role: any) => role === '670d2db6d696affd52e661c3').length !== 0 ? true : false;
  const actionLink = isSeller ? `/product/upload` : `/${customerUrls.storeRegisterUrl}`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await authAPIs.logout();
      localStorage.removeItem('accessToken');
      dispatch(deleteAuth());
      navigate(`/`);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.profileUrl}`}>My Profile</Link>,
    },
    {
      key: '2',
      label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.puchasesUrl}`}>My Purchases</Link>,
    },
    {
      key: '3',
      label: <Link to={`/${accountUrls.accountUrl}/${accountUrls.reviewUrl}`}>My Reviews</Link>,
    },
    {
      key: '4',
      label: (
        <Typography.Paragraph className="m-0 p-0" onClick={handleLogOut}>
          Logout
        </Typography.Paragraph>
      ),
    },
  ];

  return (
    <Flex gap={'large'} justify="center" align="center">
      <Dropdown menu={{ items }}>
        <Link to={`/user/${profile?.slug}`}>
          <Flex gap={'small'} align="center">
            <Avatar size="large" src={profile?.avatar} icon={<UserOutlined />} />
            <p className="m-0 hidden font-sans xl:inline">{formattedName(profile)}</p>
          </Flex>
        </Link>
      </Dropdown>
      <Divider type="vertical" className="m-0" />
      <Link to={`/${customerUrls.cartUrl}`}>
        <Badge count={itemAmount} offset={[-5, 5]}>
          <Button
            type="text"
            icon={<ShoppingCartOutlined className="text-xl" />}
            className="flex h-12 w-12 items-center justify-center text-blue-600 hover:bg-gray-100"
          />
        </Badge>
      </Link>
      <NotificationBell />
      <Link to={actionLink}>
        <Button type="primary" className="hidden px-10 text-base md:inline">
          Sell a product
        </Button>
      </Link>
    </Flex>
  );
};

export default UserInfoGroup;
