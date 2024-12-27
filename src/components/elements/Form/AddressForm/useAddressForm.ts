import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { addressAPIs } from '../../../../apis/address.api';
import { handleError } from '../../../../utils/handleError';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../types/address.type';

const useAddressForm = (
  selectedDistrict: DistrictAddressProps | null,
  selectedProvince: ProvincesAddressProps | null,
  selectedWard: WardAddressProps | null,
  setSelectedDistrict: React.Dispatch<React.SetStateAction<DistrictAddressProps | null>>,
  setSelectedProvince: React.Dispatch<React.SetStateAction<ProvincesAddressProps | null>>,
  setSelectedWard: React.Dispatch<React.SetStateAction<WardAddressProps | null>>,
  setSelectedDefault: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [province, setProvince] = useState<ProvincesAddressProps[]>([]);
  const [district, setDistrict] = useState<DistrictAddressProps[]>([]);
  const [ward, setWard] = useState<WardAddressProps[]>([]);

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
    if (chosenProvince) {
      const data: ProvincesAddressProps = {
        ProvinceID: chosenProvince.ProvinceID,
        ProvinceName: chosenProvince.ProvinceName?.trim(),
      };
      setSelectedProvince(data);
      getDistrictData(chosenProvince.ProvinceID);
      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  };

  const onDistrictChange = (e: any) => {
    const chosenDistrict = district.find((item: DistrictAddressProps) => Number(item.DistrictID) === Number(e.key));
    if (chosenDistrict && selectedProvince) {
      const data: DistrictAddressProps = {
        DistrictID: chosenDistrict.DistrictID,
        ProvinceID: selectedProvince.ProvinceID,
        DistrictName: chosenDistrict.DistrictName?.trim(),
      };
      setSelectedDistrict(data);
      getWardData(chosenDistrict?.DistrictID);
    }
  };

  const onWardChange = (e: any) => {
    const chosenWard = ward.find((item: WardAddressProps) => Number(item.WardCode) === Number(e.key));
    if (chosenWard && selectedDistrict) {
      const data: WardAddressProps = {
        WardCode: chosenWard.WardCode?.toString().trim(),
        DistrictID: selectedDistrict.DistrictID,
        WardName: chosenWard.WardName?.trim(),
      };
      setSelectedWard(data);
    }
  };

  const onDefaultChange = (e: CheckboxChangeEvent) => {
    let isSelected = e.target.checked;

    if (isSelected) {
      setSelectedDefault(true);
    } else {
      setSelectedDefault(false);
    }
  };

  useEffect(() => {
    getProvinceData();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getDistrictData(selectedProvince.ProvinceID);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      getWardData(selectedDistrict.DistrictID);
    }
  }, [selectedDistrict]);

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
