import { useEffect, useState } from 'react';
import { AddressProps } from '../../../../../types/address.type';
import { UserProps } from '../../../../../types/user.type';

const useReceiverAddress = (
  profile: UserProps | undefined,
  value: AddressProps | undefined,
  setValue: React.Dispatch<React.SetStateAction<AddressProps | undefined>>,
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressList, setAddressList] = useState<AddressProps[]>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (profile) {
      if (profile.address) {
        setAddressList(profile.address);
      }
    }
  }, [profile]);

  useEffect(() => {
    if (addressList) {
      const defaultAddress: AddressProps | undefined =
        addressList && addressList.find((address: AddressProps) => address.isDefault);
      if (defaultAddress) {
        setValue(defaultAddress);
      }
    }
  }, [addressList]);

  return {
    isModalOpen,
    setValue,
    value,
    showModal,
    setIsModalOpen,
    addressList,
  };
};
export default useReceiverAddress;
