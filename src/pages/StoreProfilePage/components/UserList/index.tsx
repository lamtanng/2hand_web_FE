import { Divider, Flex, Typography, Image } from 'antd';
import emptyUser from '../../../../assets/emptyUser.webp';
import UserItem from '../UserItem';

const UserList = () => {
  return (
    <>
      <UserItem/>
      <Divider/>
      <Flex align="center" vertical>
        <Image src={emptyUser} width={'60%'} preview={false} />
        <Typography.Title level={5} className="text-blue-600">
          You are currently not following anyone.
        </Typography.Title>
      </Flex>
    </>
  );
};

export default UserList;
