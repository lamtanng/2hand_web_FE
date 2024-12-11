import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { useState } from 'react';
import AddressModal from '../AddressModal';
import useAddressItem from './useAddressItem';
import { AddressProps } from '../../../../../types/address.type';
import { UserProps } from '../../../../../types/user.type';
import { formattedAddress } from '../../../../../utils/formattedAddress';

const AddressItem = ({ address, profile }: { address: AddressProps; profile: UserProps | undefined }) => {
  const { handleDeleteAddress, handleSetDefault } = useAddressItem(address, profile);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Flex justify="space-between" align="center">
      <div id="info" className="w-3/5">
        <p className="font-sans">
          {formattedAddress(address)}
        </p>
        {address.isDefault && <Tag color="geekblue">Default address</Tag>}
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
        {!address.isDefault && <Button onClick={handleSetDefault}>Set as default</Button>}
      </Flex>
    </Flex>
  );
};

export default AddressItem;
