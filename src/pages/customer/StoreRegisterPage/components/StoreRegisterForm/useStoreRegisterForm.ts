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
import { accountUrls } from '../../../../../constants/urlPaths/customer/accountUrls';
import { Modal } from 'antd';
import { NewStoreProps } from '../../../../../types/http/store.type';

const useStoreForm = () => {
  const { user } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  const method = useForm<FormStoreProps>({
    resolver: yupResolver(storeSchema),
    defaultValues: {
      name: '',
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
  const [description, setDescription] = useState<string>('');

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Please update your information before registing for a store.',
      onOk() {
        navigate(`/${accountUrls.accountUrl}/${accountUrls.profileUrl}`)
      },
      onCancel() {
        navigate('/');
      },
    });
  };

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
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
      const data: NewStoreProps = {
        name: store.name,
        description: description,
        address: [
          {
            address: store.detailAddress,
            ward: selectedWard,
            district: selectedDistrict,
            province: selectedProvince,
            isDefault: isDefault,
          },
        ],
        phoneNumber: store.phoneNumber,
        userID: profile?._id,
      };
      console.log(data);
      await storeAPIs.addStore(data);
      displaySuccess('Registered successfully.');
      navigate(`/user/${profile?.slug}`);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUserByID(user._id);
  }, []);

  useEffect(() => {
    if (profile) {
      if (!profile?.phoneNumber) {
        showConfirm();
      } else {
        reset({
          name: `${profile.firstName} ${profile.lastName}`,
          phoneNumber: profile.phoneNumber,
        });
      }
    }
  }, [profile]);

  return {
    handleSubmit,
    method,
    reset,
    handleStoreRegister,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    description,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    setDescription,
    isDefault,
    profile,
    handleChooseAddress,
  };
};

export default useStoreForm;
