import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Flex, Form, Menu, Typography } from 'antd';
import CustomFormItem from '../../ControlledComponents/ControlledInput';
import useAddressForm from './useAddressForm';
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../types/address.type';

const AddressForm = ({
  selectedDistrict,
  selectedProvince,
  selectedWard,
  setSelectedDistrict,
  setSelectedProvince,
  setSelectedWard,
  setDefault,
}: {
  selectedDistrict: DistrictAddressProps | undefined;
  selectedProvince: ProvincesAddressProps | undefined;
  selectedWard: WardAddressProps | undefined;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<DistrictAddressProps | undefined>>;
  setSelectedProvince: React.Dispatch<React.SetStateAction<ProvincesAddressProps | undefined>>;
  setSelectedWard: React.Dispatch<React.SetStateAction<WardAddressProps | undefined>>;
  setDefault: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { district, province, ward, onDistrictChange, onProvinceChange, onWardChange, onDefaultChange } =
    useAddressForm(
      selectedDistrict,
      selectedProvince,
      selectedWard,
      setSelectedDistrict,
      setSelectedProvince,
      setSelectedWard,
      setDefault,
    );
  const provinceItems = (data: any[], onClick: any) => (
    <Menu style={{ maxHeight: '200px', overflowY: 'auto' }} onClick={onClick}>
      {data.map((item: any) => (
        <Menu.Item key={item.ProvinceID}>{item.ProvinceName}</Menu.Item>
      ))}
    </Menu>
  );

  const districtItems = (data: any[], onClick: any) => (
    <Menu style={{ maxHeight: '200px', overflowY: 'auto' }} onClick={onClick}>
      {data.map((item: any) => (
        <Menu.Item key={item.DistrictID}>{item.DistrictName}</Menu.Item>
      ))}
    </Menu>
  );

  const wardItems = (data: any[], onClick: any) => (
    <Menu style={{ maxHeight: '200px', overflowY: 'auto' }} onClick={onClick}>
      {data.map((item: any) => (
        <Menu.Item key={item.WardCode}>{item.WardName}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <Flex gap={'large'} className="w-full">
        <Form.Item className="w-full">
          <div>
            <Typography.Paragraph className="m-0 mb-2">Province</Typography.Paragraph>
            <Dropdown overlay={provinceItems(province, onProvinceChange)} trigger={['click']} placement="bottom">
              <Button className="w-full">
                <Flex justify="space-between" className="w-full">
                  <Typography.Paragraph className="m-0 truncate">
                    {selectedProvince ? selectedProvince.ProvinceName : 'Select'}
                  </Typography.Paragraph>
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>
          </div>
        </Form.Item>
        <Form.Item className="w-full">
          <div>
            <Typography.Paragraph className="m-0 mb-2">District</Typography.Paragraph>
            <Dropdown overlay={districtItems(district, onDistrictChange)} trigger={['click']}>
              <Button className="w-full">
                <Flex justify="space-between" className="w-full">
                  <Typography.Paragraph className="m-0 truncate">
                    {selectedDistrict ? selectedDistrict.DistrictName : 'Select'}
                  </Typography.Paragraph>
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>
          </div>
        </Form.Item>
        <Form.Item className="w-full">
          <div>
            <Typography.Paragraph className="m-0 mb-2">Ward</Typography.Paragraph>
            <Dropdown overlay={wardItems(ward, onWardChange)} trigger={['click']}>
              <Button className="w-full">
                <Flex justify="space-between" className="w-full">
                  <Typography.Paragraph className="m-0 truncate">
                    {selectedWard ? selectedWard.WardName : 'Select'}
                  </Typography.Paragraph>
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>
          </div>
        </Form.Item>
      </Flex>
      <CustomFormItem name="detailAddress" hint="5X, ABC Street" label="Detail address" isRequired={true} />
      <Form.Item>
        <Checkbox onChange={onDefaultChange}>Set as default address</Checkbox>
      </Form.Item>
    </>
  );
};

export default AddressForm;
