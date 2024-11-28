import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { StoreProfileProps, storeProfileSchema } from './StoreProfile.constants';
import { UserProps } from '../../../types/user.type';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../types/address.type';
import { storeAPIs } from '../../../apis/store.api';
import { handleError } from '../../../utils/handleError';
import { StoreProps } from '../../../types/store.type';
import { UpdateStoreRequestProps } from '../../../types/http/store.type';

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
  const [store, setStore] = useState<StoreProps>();
  const [value, setValue] = useState<string>();

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const updateStore = async (currentStore: StoreProfileProps) => {
    try {
      const data: UpdateStoreRequestProps = {
        _id: store?._id,
        description: value,
        name: currentStore.storeName,
      };
      console.log(data);
      await storeAPIs.updateStore(data);
    } catch (error) {
      handleError;
    }
  };

  useEffect(() => {
    if (store) {
      setSelectedProvince(store.address[0].province);
      setSelectedDistrict(store.address[0].district);
      setSelectedWard(store.address[0].ward);
      setDefault(store.address[0].isDefault);
      reset({
        detailAddress: store.address[0].address,
        storeName: store.name,
      });
      setValue(store.description);
    }
  }, [store]);

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
    setSubmitting,
    store,
    value,
    setValue,
    updateStore,
  };
};

export default useStoreProfileForm;
