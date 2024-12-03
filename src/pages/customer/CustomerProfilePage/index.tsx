import { Button, Divider, Flex, Typography } from 'antd';
import ProfileForm from './components/ProfileForm';
import UploadAvatar from './components/UploadAvatar';
import { ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PhoneModal from './components/PhoneModal';
import useAccountPage from '../AccountPage/useAccountPage';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';

const Profile = () => {
  const { profile, isLoading } = useAccountPage();
  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isSeller =
    profile?.roleID?.filter((role: any) => role === '670d2db6d696affd52e661c3').length !== 0 ? true : false;
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
      {isLoading ? (
        <PageSpin />
      ) : (
        <div id="profile">
          <Flex gap={50} justify="space-between" align="center" className="px-10">
            <div className="w-2/3">
              <ProfileForm
                profile={profile}
                setIsModalOpen={setIsModalOpen}
                imgUrl={imageUrl}
                setImgUrl={setImageUrl}
              />
              <PhoneModal profile={profile} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
            <Divider type="vertical" className="h-96" />
            <div className="w-1/3">
              <UploadAvatar setImageUrl={setImageUrl} imageUrl={imageUrl} />
            </div>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Profile;
