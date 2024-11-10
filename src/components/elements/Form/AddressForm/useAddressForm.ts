import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { addressAPIs } from '../../../../apis/address.api';
import { handleError } from '../../../../utils/handleError';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../types/address.type';

const useAddressForm = (
  selectedDistrict: DistrictAddressProps | undefined,
  selectedProvince: ProvincesAddressProps | undefined,
  selectedWard: WardAddressProps | undefined,
  setSelectedDistrict: React.Dispatch<React.SetStateAction<DistrictAddressProps | undefined>>,
  setSelectedProvince: React.Dispatch<React.SetStateAction<ProvincesAddressProps | undefined>>,
  setSelectedWard: React.Dispatch<React.SetStateAction<WardAddressProps | undefined>>,
  setDefault: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [province, setProvince] = useState<ProvincesAddressProps[]>([]);
  const [district, setDistrict] = useState<DistrictAddressProps[]>([]);
  const [ward, setWard] = useState<WardAddressProps[]>([]);
  //   const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps>();
  //   const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps>();
  //   const [selectedWard, setSelectedWard] = useState<WardAddressProps>();
  //   const [isDefault, setDefault] = useState<boolean>(false);

  const getProvinceData = async () => {
    try {
      const res = await addressAPIs.getProvinces();
      setProvince(res.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getDistrictData = async (provinceId: number | undefined) => {
    try {
      const res = await addressAPIs.getDistricts(provinceId);
      setDistrict(res.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getWardData = async (districtId: number | undefined) => {
    try {
      const res = await addressAPIs.getWards(districtId);
      setWard(res.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const onProvinceChange = (e: any) => {
    const chosenProvince = province.find((item: ProvincesAddressProps) => Number(item.ProvinceID) === Number(e.key));
    console.log(chosenProvince);
    const data: ProvincesAddressProps = {
      ProvinceID: chosenProvince?.ProvinceID,
      ProvinceName: chosenProvince?.ProvinceName,
    };
    setSelectedProvince(data);
    getDistrictData(chosenProvince?.ProvinceID);
  };

  const onDistrictChange = (e: any) => {
    const chosenDistrict = district.find((item: DistrictAddressProps) => Number(item.DistrictID) === Number(e.key));
    const data: DistrictAddressProps = {
      DistrictID: chosenDistrict?.DistrictID,
      ProvinceID: selectedProvince?.ProvinceID,
      DistrictName: chosenDistrict?.DistrictName,
    };
    setSelectedDistrict(data);
    getWardData(chosenDistrict?.DistrictID);
  };

  const onWardChange = (e: any) => {
    const chosenWard = ward.find((item: WardAddressProps) => Number(item.WardCode) === Number(e.key));
    const data: WardAddressProps = {
      WardCode: chosenWard?.WardCode,
      DistrictID: selectedDistrict?.DistrictID,
      WardName: chosenWard?.WardName,
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

  useEffect(() => {
    getProvinceData();
  }, []);

  return {
    province,
    district,
    ward,
    onDistrictChange,
    onProvinceChange,
    onWardChange,
    onDefaultChange,
    selectedDistrict,
    selectedProvince,
    selectedWard,
  };
};

export default useAddressForm;
