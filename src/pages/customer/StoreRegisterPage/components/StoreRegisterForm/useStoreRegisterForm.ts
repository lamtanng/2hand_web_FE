import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormStoreProps, storeSchema } from './StoreRegister.constants';
import { handleError } from '../../../../../utils/handleError';
import { useState } from 'react';
import { storeAPIs } from '../../../../../apis/store.api';
import { displaySuccess } from '../../../../../utils/displayToast';
import { useAppSelector } from '../../../../../redux/hooks';
import { loginSelector } from '../../../../../redux/slices/login.slice';
import { useNavigate } from 'react-router-dom';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../../types/address.type';

const useStoreForm = () => {
  const { user } = useAppSelector(loginSelector);
  const encodedID = user && user._id && btoa(user._id);
  const navigate = useNavigate();
  const method = useForm<FormStoreProps>({
    resolver: yupResolver(storeSchema),
    defaultValues: {
      name: `${user.firstName} ${user.lastName}`,
      description: '',
      phoneNumber: user.phoneNumber,
      detailAddress: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);

  const handleStoreRegister = async (store: FormStoreProps) => {
    try {
      const data = {
        name: store.name,
        description: store.description,
        phoneNumber: store.phoneNumber,
        userID: user._id,
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
    isDefault
  };
};

export default useStoreForm;
