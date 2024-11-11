import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  AddressProps,
  DistrictAddressProps,
  ProvincesAddressProps,
  WardAddressProps,
} from '../../../../../../../../../types/address.type';
import { useState } from 'react';
import {
  addressSchema,
  FormAddressProps,
} from '../../../../../../../../../components/elements/Form/AddressForm/address.constants';
import { handleError } from '../../../../../../../../../utils/handleError';

const useAddressForm = () => {
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

  const handleAddAddress = (detailAddress: FormAddressProps) => {
    try {
      setSubmitting(true);
      const data: AddressProps = {
        address: detailAddress.detailAddress,
        ward: selectedWard,
        district: selectedDistrict,
        province: selectedProvince,
        isDefault: isDefault,
      };
      console.log(data);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

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
    isDefault
  };
};

export default useAddressForm;
