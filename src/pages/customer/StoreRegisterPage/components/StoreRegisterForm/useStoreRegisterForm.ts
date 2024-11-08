import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StoreProps, storeSchema } from './StoreRegister.constants';
import { handleError } from '../../../../../utils/handleError';
import { useEffect, useState } from 'react';
import { addressAPIs } from '../../../../../apis/address.api';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { storeAPIs } from '../../../../../apis/store.api';
import { displaySuccess } from '../../../../../utils/displayToast';
import { useAppSelector } from '../../../../../redux/hooks';
import { loginSelector } from '../../../../../redux/slices/login.slice';
import { useNavigate } from 'react-router-dom';

const useStoreForm = () => {
  const { user } = useAppSelector(loginSelector);
  const encodedID = user && user._id && btoa(user._id);
  const navigate = useNavigate();
  const [province, setProvince] = useState<any[]>([]);
  const method = useForm<StoreProps>({
    resolver: yupResolver(storeSchema),
    defaultValues: {
      name: `${user.firstName} ${user.lastName}`,
      description: '',
      phoneNumber: user.phoneNumber,
      detailAddress: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [district, setDistrict] = useState<any[]>([]);
  const [ward, setWard] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>();
  const [selectedDistrict, setSelectedDistrict] = useState<any>();
  const [selectedWard, setSelectedWard] = useState<any>();
  const [isDefault, setDefault] = useState<boolean>(false);

  const onProvinceChange = (e: any) => {
    const chosenProvince = province.find((item: any) => Number(item.code) === Number(e.key));
    const data = {
      ProvinceID: chosenProvince.code,
      ProvinceName: chosenProvince.name,
    };
    setSelectedProvince(data);
    setDistrict(province.find((item: any) => Number(item.code) === Number(e.key)).districts);
  };
  const onDistrictChange = (e: any) => {
    const chosenDistrict = district.find((item: any) => Number(item.code) === Number(e.key));
    const data = {
      DistrictID: chosenDistrict.code,
      ProvinceID: selectedProvince.ProvinceID,
      DistrictName: chosenDistrict.name,
    };
    setSelectedDistrict(data);
    setWard(district.find((item: any) => Number(item.code) === Number(e.key)).wards);
  };
  const onWardChange = (e: any) => {
    const chosenWard = ward.find((item: any) => Number(item.code) === Number(e.key));
    const data = {
      WardCode: chosenWard.code,
      DistrictID: selectedDistrict.DistrictID,
      WardName: chosenWard.name,
    };
    setSelectedWard(data);
  };
  const onDefaultChange = (e: CheckboxChangeEvent) => {
    let isSelected = e.target.checked;

    if (isSelected) {
      setDefault(true);
    } else {
      setDefault(false);
    }
  };

  const getProvinceData = async () => {
    try {
      const res = await addressAPIs.getProvince();
      setProvince(res.data);
      console.log(res);
    } catch (error) {
      handleError(error);
    }
  };

  const handleStoreRegister = async (store: StoreProps) => {
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

  useEffect(() => {
    getProvinceData();
  }, []);

  return {
    handleSubmit,
    method,
    reset,
    handleStoreRegister,
    province,
    district,
    ward,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    onDefaultChange,
  };
};

export default useStoreForm;
