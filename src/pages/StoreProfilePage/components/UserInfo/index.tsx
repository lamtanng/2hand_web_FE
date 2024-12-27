import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Typography } from 'antd';
import useUserProfileDetail from '../../useUserProfileName';
import { formattedName } from '../../../../utils/formatName';
import { useAppSelector } from '../../../../redux/hooks';
import { loginSelector } from '../../../../redux/slices/login.slice';

const UserInfo = () => {
  const { user } = useAppSelector(loginSelector);
  const { profile } = useUserProfileDetail();
  const dateString = profile && profile.createdAt && new Date(profile.createdAt).toDateString();

  return (
    <div className="mb-6 rounded-xl bg-white px-24 py-8 shadow-sm">
      <Flex gap={100} align="center">
        <Avatar size={150} src={profile?.avatar} icon={<UserOutlined />} />
        <Flex vertical gap={'large'}>
          <Typography.Title level={3} className="m-0">
            {formattedName(profile)}
          </Typography.Title>
          <div id="store-info" className="grid grid-cols-2 gap-6">
            <Typography.Paragraph className="m-0 text-base">Phone number: {profile?.phoneNumber}</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">Joined in: {dateString}</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              Followers: {profile?.followerID?.length}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              Following: {profile?.followingID?.length}
            </Typography.Paragraph>
          </div>
          {user._id === profile?._id ? null : (
            <Flex gap={'large'}>
              <Button variant="filled" color="primary" className="w-1/2">
                <MessageOutlined /> Chat now
              </Button>
              <Button type="primary" className="w-1/2">
                Follow
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default UserInfo;
