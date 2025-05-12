import { ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Modal, Typography } from 'antd';

const UserItem = () => {
    const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: 'Do you want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
  return (
    <Flex align="center" gap={'large'}>
      <Avatar size={75} src={''} icon={<UserOutlined />} />
      <Typography.Title level={5} className="m-0 flex-grow text-blue-600">
        Name
      </Typography.Title>
      <Button onClick={showConfirm}>Following</Button>
      {/* <Button type="primary">Follow back</Button> */}
    </Flex>
  );
};

export default UserItem;
