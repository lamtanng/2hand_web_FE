import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Tag, Typography } from 'antd';
import { useState } from 'react';
import AddressModal from './components/AddressModal';

const data = {
  userID: 1,
  name: 'Luong Bui',
  phoneNumber: '0785352677',
  address: [
    {
      name: 'Luong Bui',
      phoneNumber: '0785352677',
      address: '105/14, đường 385, khu phố 6',
      ward: 'Phường Tăng Nhơn Phú A',
      district: 'Thành Phố Thủ Đức',
      city: 'TP. Hồ Chí Minh',
      isDefault: true,
    },
    {
      name: 'Luong Bui',
      phoneNumber: '0785352677',
      address: 'Trường Đại Học Sư Phạm Kỹ Thuật, Đường Võ Văn Ngân',
      ward: 'Phường Linh Chiểu',
      district: 'Thành Phố Thủ Đức',
      city: 'TP. Hồ Chí Minh',
      isDefault: false,
    },
  ],
};

const ReceiverAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(JSON.stringify(data.address[0]));
  const address = JSON.parse(value);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div id="receiver-address" className="mb-6 rounded-md bg-white p-8 shadow-sm">
      <Typography.Title level={4} className="m-0 text-blue-600">
        <EnvironmentOutlined /> Receiver Address
      </Typography.Title>
      <Divider />
      <Flex gap={'large'} align="center">
        <div className="w-1/6">
          <Typography.Paragraph className="m-0 text-base font-semibold">{data.name}</Typography.Paragraph>
          <Typography.Paragraph className="m-0 text-base font-semibold">{data.phoneNumber}</Typography.Paragraph>
        </div>
        <div className="w-4/6">
          <Typography.Paragraph className="m-0 text-base">{`${address.address}, ${address.ward}, ${address.district}, ${address.city}`}</Typography.Paragraph>
        </div>
        <div className="w-1/12">{address.isDefault && <Tag color="geekblue">Default</Tag>}</div>
        <div className="w-1/12">
          <Button variant="text" color="primary" className="p-0 hover:bg-transparent" onClick={showModal}>
            Change
          </Button>
          <AddressModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            data={data}
            setValue={setValue}
            value={value}
          />
        </div>
      </Flex>
    </div>
  );
};

export default ReceiverAddress;
