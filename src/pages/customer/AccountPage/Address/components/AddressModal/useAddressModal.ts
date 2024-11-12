import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addressSchema, FormAddressProps } from '../../Address.constants';
import { handleError } from '../../../../../../utils/handleError';
import { useEffect, useState } from 'react';
import {
  AddressProps,
  DistrictAddressProps,
  ProvincesAddressProps,
  WardAddressProps,
} from '../../../../../../types/address.type';
import { userAPIs } from '../../../../../../apis/user.api';
import eventEmitter from '../../../../../../utils/eventEmitter';
import { displaySuccess } from '../../../../../../utils/displayToast';
import { AddressRequestProps } from '../../../../../../types/http/address.type';
import { UserProps } from '../../../../../../types/user.type';

const useAddressModal = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  address: AddressProps | undefined,
  profile: UserProps | undefined,
) => {
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
    method.reset(); // Reset form
    setSelectedDistrict(null);
    setSelectedProvince(null);
    setSelectedWard(null);
    setDefault(false);
  };

  const handleAddAddress = async (data: AddressRequestProps) => {
    try {
      setSubmitting(true);
      await userAPIs.createAddress(data);
      eventEmitter.emit('addAddress');
      displaySuccess('New address has been added successfully.');
    } catch (error) {
      handleError(error);
    } finally {
      reset;
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleUpdateAddress = async (data: AddressRequestProps) => {
    try {
      setSubmitting(true);
      console.log(data);
      await userAPIs.updateAddress(data);
      eventEmitter.emit('updateAddress');
      displaySuccess('Address has been updated successfully.');
    } catch (error) {
      handleError(error);
    } finally {
      reset;
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const submitButtonClick = (detailAddress: FormAddressProps) => {
    const data: AddressRequestProps = {
      _id: profile?._id,
      address: {
        _id: address?._id,
        address: detailAddress.detailAddress,
        ward: selectedWard,
        district: selectedDistrict,
        province: selectedProvince,
        isDefault: isDefault,
      },
    };
    if (address) {
      handleUpdateAddress(data);
    } else {
      handleAddAddress(data);
    }
  };

  useEffect(() => {
    if (address) {
      reset({ detailAddress: address.address });
      setSelectedProvince(address.province);
      setSelectedDistrict(address.district);
      setSelectedWard(address.ward);
      setDefault(address.isDefault);
    }
  }, []);

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
    isDefault,
    submitButtonClick,
  };
};

export default useAddressModal;
