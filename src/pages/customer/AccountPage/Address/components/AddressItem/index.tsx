import { EditOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import React from 'react';
import AddressModal from '../AddressModal';
import { AddressProps } from '../../../../../../types/address.type';

const AddressItem = ({
  address,
  isModalOpen,
  setIsModalOpen,
}: {
  address: AddressProps;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Flex justify="space-between" align="center">
      <div id="info" className="w-3/5">
        <p className="font-sans">
          {`${address.address}, ${address.ward?.WardName}, ${address.district?.DistrictName}, ${address.province?.ProvinceName}`}
        </p>
        {address.isDefault && <Tag color="geekblue">Default address</Tag>}
      </div>
      <Flex id="actions" vertical align="end">
        <Button
          type="link"
          className="p-0"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <EditOutlined /> Edit
        </Button>
        <AddressModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button>Set as default</Button>
      </Flex>
    </Flex>
  );
};

export default AddressItem;
