import { Button, Divider, Flex, Typography } from 'antd';
import ProfileForm from './components/ProfileForm';
import UploadAvatar from './components/UploadAvatar';
import { ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { customerUrls } from '../../../../constants/urlPaths/customer/customerUrls';
import useAccountPage from '../useAccountPage';
import { Role } from '../../../../types/enum/role.enum';

const Profile = () => {
  const { profile } = useAccountPage();
  const isSeller = profile?.roleID?.filter((role: any) => role.name === Role.Seller).length !== 0 ? true : false;
  console.log('user', profile);
  return (
    <div id="container" className="px-12 py-5">
      <Flex justify="space-between" align="center">
        <div id="title">
          <Typography.Title level={3}>My Profile</Typography.Title>
          <Typography.Paragraph>Manage your profile for security purpose.</Typography.Paragraph>
        </div>
        {!isSeller && (
          <Link to={`/${customerUrls.storeRegisterUrl}`}>
            <Button hidden={!isSeller} type="primary" className="h-10 text-base">
              <ShopOutlined /> Become seller
            </Button>
          </Link>
        )}
      </Flex>
      <Divider />
      <div id="profile">
        <Flex gap={50} justify="space-between" align="center" className="px-10">
          <div className="w-2/3">
            <ProfileForm />
          </div>
          <Divider type="vertical" className="h-96" />
          <div className="w-1/3">
            <UploadAvatar />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Profile;
