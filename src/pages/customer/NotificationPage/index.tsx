import { AccountBookTwoTone, BellTwoTone, ShoppingTwoTone, ShopTwoTone } from '@ant-design/icons';
import { Divider, Flex, Typography } from 'antd';

const Notifications = () => {
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Typography.Title level={3}>Notifications</Typography.Title>
      </div>
      <Divider />
      <div>
        <Flex gap={'large'} align="start">
          <BellTwoTone className="rounded-full bg-blue-100 p-3 text-2xl" />
          {/* <ShopTwoTone twoToneColor={"green"} className="rounded-full bg-green-50 p-3 text-2xl" /> */}
          {/* <ShoppingTwoTone twoToneColor={"red"} className="rounded-full bg-red-100 p-3 text-2xl" /> */}
          {/* <AccountBookTwoTone twoToneColor={"yellow"} className="rounded-full bg-yellow-50 p-3 text-2xl" /> */}
          <Flex vertical gap={'small'}>
            <Typography.Title level={5} className="m-0">
              Title
            </Typography.Title>
            <Typography.Paragraph className="m-0 text-xs text-gray-400">timestamp</Typography.Paragraph>
            <Typography.Paragraph className="m-0">Notification content</Typography.Paragraph>
          </Flex>
        </Flex>
      </div>
      {/* {isLoading ? <PageSpin /> : <AddressList profile={profile} />} */}
    </div>
  );
};

export default Notifications;
