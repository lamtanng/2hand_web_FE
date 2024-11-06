import { Button, Divider, Flex, Radio, Tag, Typography } from 'antd';

const AddressItem = ({
  address,
  setFormVisible,
  setRadioVisible,
}: {
  address: any;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Divider />
      <Radio value={JSON.stringify(address)} className="w-full">
        <Flex justify="space-between" align="center" className="w-full">
          <Flex align="center">
            <Typography.Paragraph className="m-0 text-base">{address.name}</Typography.Paragraph>
            <Divider type="vertical" />
            <Typography.Paragraph className="m-0 text-base text-gray-500">{address.phoneNumber}</Typography.Paragraph>
          </Flex>
          <Button
            variant="link"
            color="primary"
            className="p-0"
            onClick={() => {
              setFormVisible(false), setRadioVisible(true);
            }}
          >
            Edit
          </Button>
        </Flex>
        <Typography.Paragraph className="m-0 mb-2 text-base">{`${address.address}, ${address.ward}, ${address.district}, ${address.city}`}</Typography.Paragraph>
        {address.isDefault && <Tag color="geekblue">Default</Tag>}
      </Radio>
    </div>
  );
};

export default AddressItem;
