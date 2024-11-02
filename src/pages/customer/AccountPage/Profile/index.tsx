import { Divider, Flex, Typography } from 'antd';
import ProfileForm from './components/ProfileForm';
import UploadAvatar from './components/UploadAvatar';

const Profile = () => {
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Typography.Title level={3}>My Profile</Typography.Title>
        <Typography.Paragraph>Manage your profile for security purpose.</Typography.Paragraph>
      </div>
      <Divider />
      <div id="profile">
        <Flex gap={50} justify="space-between" align='center' className="px-10">
          <div className="w-2/3">
            <ProfileForm />
          </div>
          <Divider type="vertical" className='h-96'/>
          <div className="w-1/3">
            <UploadAvatar />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Profile;
