import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  AddressProps,
  DistrictAddressProps,
  ProvincesAddressProps,
  WardAddressProps,
} from '../../../../../../../../../types/address.type';
import { useEffect, useState } from 'react';
import {
  addressSchema,
  FormAddressProps,
} from '../../../../../../../../../components/elements/Form/AddressForm/address.constants';
import { handleError } from '../../../../../../../../../utils/handleError';
import { userAPIs } from '../../../../../../../../../apis/user.api';
import { AddressRequestProps } from '../../../../../../../../../types/http/address.type';
import eventEmitter from '../../../../../../../../../utils/eventEmitter';
import { UserProps } from '../../../../../../../../../types/user.type';

const useAddressForm = (
  address: AddressProps | undefined,
  profile: UserProps | undefined,
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressProps | undefined>>,
) => {
  const method = useForm<FormAddressProps>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      detailAddress: '',
    },
  });
  const { handleSubmit, reset } = method;
  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleAddAddress = async (data: AddressRequestProps) => {
    try {
      setSubmitting(true);
      await userAPIs.createAddress(data);
      eventEmitter.emit('addAddress');
    } catch (error) {
      handleError(error);
    } finally {
      reset;
      setSubmitting(false);
    }
  };

  const handleUpdateAddress = async (data: AddressRequestProps) => {
    try {
      setSubmitting(true);
      console.log(data);
      await userAPIs.updateAddress(data);
      eventEmitter.emit('updateAddress');
    } catch (error) {
      handleError(error);
    } finally {
      reset;
      setSubmitting(false);
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
    setFormVisible(true);
    setRadioVisible(false);
    setEditedAddress(undefined);
  };

  useEffect(() => {
    if (address) {
      reset({
        detailAddress: address.address,
      });
      setSelectedDistrict(address.district);
      setSelectedProvince(address.province);
      setSelectedWard(address.ward);
      setDefault(address.isDefault);
    }
  }, [address]);

  return {
    handleSubmit,
    method,
    reset,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    isSubmitting,
    handleAddAddress,
    isDefault,
    submitButtonClick,
  };
};

export default useAddressForm;
