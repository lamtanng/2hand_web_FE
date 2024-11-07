import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Tag, Typography } from 'antd';
import { useState } from 'react';
import AddressModal from './components/AddressModal';

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={3}>My Addresses</Typography.Title>
          <Button type="primary" className="h-10 text-base" onClick={() => {setIsModalOpen(true)}}>
            <PlusOutlined /> Add new address
          </Button>
          <AddressModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Flex>
      </div>
      <Divider />
      <div id="address-list" className='mb-6'>
        <div id="adress-item">
          <Flex justify="space-between" align="center">
            <div id="info" className="w-3/5">
              <Typography.Title level={5} className="inline">
                Name
              </Typography.Title>
              <Divider type="vertical" />
              <Typography.Paragraph className="inline text-gray-600">Phone number</Typography.Paragraph>
              <p className="font-sans">
                Trường Đại Học Sư Phạm Kỹ Thuật, Đường Võ Văn Ngân Phường Linh Chiểu, Thành Phố Thủ Đức, TP. Hồ Chí Minh
              </p>
              <Tag color="geekblue">Default address</Tag>
            </div>
            <Flex id="actions" vertical align="end">
              <Button type="link" className="p-0" onClick={() => {setIsModalOpen(true)}}>
                <EditOutlined /> Edit
              </Button>
              <AddressModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
              <Button>Set as default</Button>
            </Flex>
          </Flex>
        </div>
        {/* <Divider/> */}
      </div>
    </div>
  );
};

export default Address;
