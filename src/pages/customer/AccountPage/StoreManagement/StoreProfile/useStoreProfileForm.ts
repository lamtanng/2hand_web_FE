import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileProps, profileSchema } from '../../Profile/Profile.constants';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../../types/address.type';

const useStoreProfileForm = () => {
  const method = useForm<ProfileProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {},
  });
  const { handleSubmit, reset } = method;

  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  return {
    handleSubmit,
    method,
    reset,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    isDefault,
    isSubmitting,
  };
};

export default useStoreProfileForm;
