import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { useState } from 'react';
import AddressModal from '../AddressModal';
import useAddressItem from './useAddressItem';
import { UserProps } from '../../../../../../types/user.type';
import { AddressRequestProps } from '../../../../../../types/http/address.type';

const AddressItem = ({ address, profile }: { address: AddressRequestProps; profile: UserProps | undefined }) => {
  const { handleDeleteAddress } = useAddressItem(address, profile);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(address)

  return (
    <Flex justify="space-between" align="center">
      <div id="info" className="w-3/5">
        <p className="font-sans">
          {`${address.address.address}, ${address.address.ward?.WardName}, ${address.address.district?.DistrictName}, ${address.address.province?.ProvinceName}`}
        </p>
        {address.address.isDefault && <Tag color="geekblue">Default address</Tag>}
      </div>
      <Flex id="actions" vertical align="end" gap={'small'}>
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
        {isModalOpen && (
          <AddressModal profile={profile} address={address} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        )}
        {!address.address.isDefault && <Button>Set as default</Button>}
      </Flex>
    </Flex>
  );
};

export default AddressItem;
