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

const useAddressModal = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, userID: string | undefined) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps>();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps>();
  const [selectedWard, setSelectedWard] = useState<WardAddressProps>();
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
        _id: userID,
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
