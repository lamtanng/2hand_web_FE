import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../../types/address.type';
import { UserProps } from '../../../../../types/user.type';
import { handleError } from '../../../../../utils/handleError';
import { storeAPIs } from '../../../../../apis/store.api';
import { StoreProfileProps, storeProfileSchema } from './StoreProfile.constants';

const useStoreProfileForm = (profile: UserProps | undefined) => {
  const method = useForm<StoreProfileProps>({
    resolver: yupResolver(storeProfileSchema),
    defaultValues: {
      detailAddress: '',
      storeName: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setSelectedProvince(res.data.address[0].province);
      setSelectedDistrict(res.data.address[0].district);
      setSelectedWard(res.data.address[0].ward);
      setDefault(res.data.address[0].isDefault);
      reset({
        detailAddress: res.data.address[0].address,
        storeName: res.data.name,
      });
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, [profile]);

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
    setSubmitting
  };
};

export default useStoreProfileForm;
