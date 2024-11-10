import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addressSchema, FormAddressProps } from '../../Address.constants';
import { handleError } from '../../../../../../utils/handleError';
import { useState } from 'react';
import {
  AddressProps,
  DistrictAddressProps,
  ProvincesAddressProps,
  WardAddressProps,
} from '../../../../../../types/address.type';
import { userAPIs } from '../../../../../../apis/user.api';
import eventEmitter from '../../../../../../utils/eventEmitter';

const useAddressModal = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const method = useForm<FormAddressProps>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      detailAddress: '',
    },
  });
  const { handleSubmit, reset } = method;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAddAddress = async (detailAddress: FormAddressProps) => {
    try {
      setSubmitting(true);
      const data: AddressProps = {
        address: detailAddress.detailAddress,
        ward: selectedWard,
        district: selectedDistrict,
        province: selectedProvince,
        isDefault: isDefault,
      };
      console.log(detailAddress);
      console.log(data);
      await userAPIs.createAddress(data);
      eventEmitter.emit('addAddress');
    } catch (error) {
      handleError(error);
    } finally {
      reset;
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return {
    handleSubmit,
    method,
    reset,
    handleAddAddress,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    handleClose,
    isSubmitting,
  };
};

export default useAddressModal;
