import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormStoreProps, storeSchema } from './StoreRegister.constants';
import { handleError } from '../../../../../utils/handleError';
import { useEffect, useState } from 'react';
import { storeAPIs } from '../../../../../apis/store.api';
import { displaySuccess } from '../../../../../utils/displayToast';
import { useAppSelector } from '../../../../../redux/hooks';
import { loginSelector } from '../../../../../redux/slices/login.slice';
import { useNavigate } from 'react-router-dom';
import {
  AddressProps,
  DistrictAddressProps,
  ProvincesAddressProps,
  WardAddressProps,
} from '../../../../../types/address.type';
import { userAPIs } from '../../../../../apis/user.api';
import { UserProps } from '../../../../../types/user.type';
import { RadioChangeEvent } from 'antd/es/radio';

const useStoreForm = () => {
  const { user } = useAppSelector(loginSelector);
  const encodedID = user && user._id && btoa(user._id);
  const navigate = useNavigate();
  const method = useForm<FormStoreProps>({
    resolver: yupResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
      phoneNumber: '',
      detailAddress: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProps>();

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
      reset({
        name: `${res.data.firstName} ${res.data.lastName}`,
        phoneNumber: res.data.phoneNumber,
      });
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const handleChooseAddress = (e: RadioChangeEvent) => {
    const selectedAddress: AddressProps = e.target.value;
    const currentValue = method.getValues();
    setDefault(selectedAddress.isDefault);
    setSelectedDistrict(selectedAddress.district);
    setSelectedProvince(selectedAddress.province);
    setSelectedWard(selectedAddress.ward);
    reset({
      ...currentValue,
      detailAddress: selectedAddress.address,
    });
  };

  const handleStoreRegister = async (store: FormStoreProps) => {
    try {
      const data = {
        name: store.name,
        description: store.description,
        address: [
          {
            address: store.detailAddress,
            ward: selectedWard,
            district: selectedDistrict,
            province: selectedProvince,
            isDefault: isDefault,
          },
        ],
      };
      console.log(data);
      await storeAPIs.addStore(data);
      displaySuccess('Registered successfully.');
      navigate(`/user/${encodedID}`);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUserByID(user._id);
  }, []);

  return {
    handleSubmit,
    method,
    reset,
    handleStoreRegister,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    isDefault,
    profile,
    handleChooseAddress,
  };
};

export default useStoreForm;
