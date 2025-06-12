import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Tabs, TabsProps, Typography } from 'antd';
import { useState } from 'react';
import { formattedName } from '../../../../utils/formatName';
import useUserProfileDetail from '../../useUserProfileName';
import UserList from '../UserList';

const UserInfo = () => {
  const { profile } = useUserProfileDetail();
  const dateString = profile && profile.createdAt && new Date(profile.createdAt).toDateString();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'followings',
      label: 'Followings (0)',
      children: <UserList />,
    },
    {
      key: 'followers',
      label: 'Followers (0)',
      children: <UserList />,
    },
  ];

  return (
    <>
      <div className="mb-6 rounded-xl bg-white px-24 py-8 shadow-sm">
        <Flex gap={100} align="center">
          <Avatar size={150} src={profile?.avatar} icon={<UserOutlined />} />
          <Flex vertical gap={'large'}>
            <Typography.Title level={3} className="m-0">
              {formattedName(profile)}
            </Typography.Title>
            <div id="store-info" className="grid grid-cols-2 gap-6">
              <Typography.Paragraph className="m-0 text-base">
                Phone number: {profile?.phoneNumber}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">Joined in: {dateString}</Typography.Paragraph>
              {/* <Typography.Paragraph className="m-0 text-base text-blue-600" onClick={showModal}>
                Followers: {profile?.followerID?.length}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base text-blue-600" onClick={showModal}>
                Following: {profile?.followingID?.length}
              </Typography.Paragraph> */}
            </div>
            {/* {user._id === profile?._id ? null : (
              <Flex gap={'large'}>
                <Button variant="filled" color="primary" className="w-1/2">
                  <MessageOutlined /> Chat now
                </Button>
                <Button type="primary" className="w-1/2">
                  Follow
                </Button>
              </Flex>
            )} */}
          </Flex>
        </Flex>
      </div>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`max-h-screen w-2/5 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
        >
          <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
            <CloseOutlined />
          </Button>
          <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
