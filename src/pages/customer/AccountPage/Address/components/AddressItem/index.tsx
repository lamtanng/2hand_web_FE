import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { useState } from 'react';
import AddressModal from '../AddressModal';
import { AddressProps } from '../../../../../../types/address.type';
import useAddressItem from './useAddressItem';

const AddressItem = ({
  address
}: {
  address: AddressProps;
}) => {
  const { handleDeleteAddress } = useAddressItem(address);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Flex justify="space-between" align="center">
      <div id="info" className="w-3/5">
        <p className="font-sans">
          {`${address.address}, ${address.ward?.WardName}, ${address.district?.DistrictName}, ${address.province?.ProvinceName}`}
        </p>
        {address.isDefault && <Tag color="geekblue">Default address</Tag>}
      </div>
      <Flex id="actions" vertical align="end">
        <Flex gap={'middle'}>
          <Button
            type="link"
            className="p-0"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <EditOutlined /> Edit
          </Button>
          <Button variant="link" color="danger" className="p-0" onClick={handleDeleteAddress}>
            <DeleteOutlined /> Delete
          </Button>
        </Flex>
        {isModalOpen && <AddressModal address={address} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
        <Button>Set as default</Button>
      </Flex>
    </Flex>
  );
};

export default AddressItem;
