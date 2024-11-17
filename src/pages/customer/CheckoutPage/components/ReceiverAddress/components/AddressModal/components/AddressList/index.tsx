import { Button, Flex, Radio, RadioChangeEvent, Space } from 'antd';
import AddressItem from '../AddressItem';
import { PlusOutlined } from '@ant-design/icons';
import { AddressProps } from '../../../../../../../../../types/address.type';
import { useState } from 'react';
import ReceiverAddressForm from '../AddressForm';
import { UserProps } from '../../../../../../../../../types/user.type';

const AddressList = ({
  data,
  setIsModalOpen,
  setValue,
  value,
  profile,
  formHidden,
  radioHidden,
  setFormHidden,
  setRadioHidden,
}: {
  data: AddressProps[] | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<AddressProps | undefined>>;
  value: AddressProps | undefined;
  profile: UserProps | undefined;
  formHidden: boolean;
  radioHidden: boolean;
  setFormHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | undefined>(value);
  const [editedAddress, setEditedAddress] = useState<AddressProps | undefined>();

  const handleOk = () => {
    setValue(selectedAddress);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setSelectedAddress(e.target.value);
  };
  return (
    <>
      <div hidden={radioHidden}>
        <Radio.Group className="w-full" onChange={onChange} value={selectedAddress}>
          <Space direction="vertical" className="w-full">
            {data?.map((address: AddressProps) => (
              <AddressItem
                address={address}
                setEditedAddress={setEditedAddress}
                setFormVisible={setFormHidden}
                setRadioVisible={setRadioHidden}
              />
            ))}
          </Space>
        </Radio.Group>
        <Flex justify="end" gap={'large'}>
          <Button
            className="px-8 py-5 text-base"
            onClick={() => {
              setFormHidden(false);
              setRadioHidden(true);
              setEditedAddress(undefined);
            }}
          >
            <PlusOutlined /> Add new address
          </Button>
          <Button className="px-8 py-5 text-base" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
            OK
          </Button>
        </Flex>
      </div>
      <ReceiverAddressForm
        setEditedAddress={setEditedAddress}
        profile={profile}
        address={editedAddress}
        hidden={formHidden}
        setFormVisible={setFormHidden}
        setRadioVisible={setRadioHidden}
      />
    </>
  );
};

export default AddressList;
