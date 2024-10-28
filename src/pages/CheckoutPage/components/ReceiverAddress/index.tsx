import { EnvironmentOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Tag, Typography } from "antd";

const ReceiverAddress = () => {
  return (
    <div id="receiver-address" className="mb-6 rounded-md bg-white p-8 shadow-sm">
      <Typography.Title level={4} className="m-0 text-blue-600">
        <EnvironmentOutlined /> Receiver Address
      </Typography.Title>
      <Divider />
      <Flex gap={'large'} align="center">
        <div className="w-1/6">
          <Typography.Paragraph className="m-0 text-base font-semibold">Receiver's Name</Typography.Paragraph>
          <Typography.Paragraph className="m-0 text-base font-semibold">Receiver's Phone</Typography.Paragraph>
        </div>
        <div className="w-4/6">
          <Typography.Paragraph className="m-0 text-base">Receiver's full address</Typography.Paragraph>
        </div>
        <div className="w-1/12">
          <Tag color="geekblue">Default</Tag>
        </div>
        <div className="w-1/12">
          <Button variant="text" color="primary" className="p-0 hover:bg-transparent">
            Change
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default ReceiverAddress;
