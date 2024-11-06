import { Button, Divider, Flex, Radio, RadioChangeEvent, Space } from 'antd';
import AddressItem from '../AddressItem';
import { PlusOutlined } from '@ant-design/icons';

const AddressList = ({
  data,
  setIsModalOpen,
  hidden,
  setFormVisible,
  setRadioVisible,
  setValue,
  value,
}: {
  data: any;
  hidden: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div hidden={hidden}>
      <Radio.Group className="w-full" onChange={onChange} value={value}>
        <Space direction="vertical" className="w-full">
          {data.address.map((address: any) => (
            <AddressItem address={address} setFormVisible={setFormVisible} setRadioVisible={setRadioVisible} />
          ))}
        </Space>
      </Radio.Group>
      <Button
        className="mt-6 px-8 py-5 text-base"
        onClick={() => {
          setFormVisible(false);
          setRadioVisible(true);
        }}
      >
        <PlusOutlined /> Add new address
      </Button>
      <Divider />
      <Flex justify="end" gap={'large'}>
        <Button className="px-8 py-5 text-base" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
          OK
        </Button>
      </Flex>
    </div>
  );
};

export default AddressList;
