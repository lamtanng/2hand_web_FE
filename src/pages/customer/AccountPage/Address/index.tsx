import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useState } from 'react';
import AddressModal from './components/AddressModal';
import useAccountPage from '../useAccountPage';
import AddressList from './components/AddressList';

const Address = () => {
  const { profile } = useAccountPage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={3}>My Addresses</Typography.Title>
          <Button
            type="primary"
            className="h-10 text-base"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <PlusOutlined /> Add new address
          </Button>
          {isModalOpen && <AddressModal profile={profile} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
        </Flex>
      </div>
      <AddressList profile={profile}/>
    </div>
  );
};

export default Address;
