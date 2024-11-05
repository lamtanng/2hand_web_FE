import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Typography } from 'antd';
import useUserProfileDetail from '../../useUserProfileName';

const UserInfo = () => {
  const { store } = useUserProfileDetail();
  const dateString = store && store.userID.createdAt && new Date(store.userID.createdAt).toDateString();

  return (
    <div className="mb-6 rounded-xl bg-white px-24 py-8 shadow-sm">
      <Flex gap={100} align="center">
        <Avatar size={150} icon={<UserOutlined />} />
        <Flex vertical gap={'large'}>
          <Typography.Title level={3} className="m-0">
            {store?.userID.firstName && store.userID.lastName
              ? `${store.userID.firstName} ${store.userID.lastName}`
              : store?.userID.email}
          </Typography.Title>
          <div id="store-info" className="grid grid-cols-2 gap-6">
            <Typography.Paragraph className="m-0 text-base">
              Phone number: {store?.userID.phoneNumber}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">Joined in: {dateString}</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              Followers: {store?.userID.followerID?.length}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              Following: {store?.userID.followingID?.length}
            </Typography.Paragraph>
          </div>
          <Flex gap={'large'}>
            <Button variant="filled" color="primary" className="w-1/2">
              <MessageOutlined /> Chat now
            </Button>
            <Button type="primary" className="w-1/2">
              Follow
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default UserInfo;
