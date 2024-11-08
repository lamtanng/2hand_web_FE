import useStoreForm from './useStoreRegisterForm';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import { Button, Checkbox, Dropdown, Flex, Form, Menu, Radio, Tag, Typography } from 'antd';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';
import CustomTextArea from '../../../../../components/elements/ControlledComponents/ControlledTextArea';
import { DownOutlined } from '@ant-design/icons';

const StoreRegisterForm = () => {
  const {
    method,
    handleSubmit,
    handleStoreRegister,
    province,
    district,
    ward,
    onDistrictChange,
    onProvinceChange,
    onWardChange,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    onDefaultChange,
  } = useStoreForm();

  const items = (data: any, onClick: any) => (
    <Menu style={{ maxHeight: '200px', overflowY: 'auto' }} onClick={onClick}>
      {data.map((item: any) => (
        <Menu.Item key={item.code}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div className="mb-5 rounded-xl bg-white p-8 shadow-sm">
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleStoreRegister)}>
          <CustomFormItem name="name" hint="Name" label="Store Name" isRequired={true} />
          <CustomTextArea name="description" hint="Description" label="Description" isRequired={true} />
          <CustomFormItem name="phoneNumber" hint="Phone number" label="Phone number" isDisabled={true} />
          <Typography.Paragraph className="m-0 -mt-4 mb-6 text-xs italic text-gray-500">
            *Note: We will use your phone number for your store.
          </Typography.Paragraph>
          <Form.Item>
            <Typography.Paragraph>Recommend Address</Typography.Paragraph>
            <Radio.Group className="w-full">
              <Flex vertical gap={'large'}>
                <Radio value={1} className="mx-0 w-full">
                  <Flex justify="space-between" gap={'large'}>
                    <Typography.Paragraph className="m-0 text-base">
                      Trường Đại Học Sư Phạm Kỹ Thuật, Đường Võ Văn Ngân Phường Linh Chiểu, Thành Phố Thủ Đức, TP. Hồ
                      Chí Minh
                    </Typography.Paragraph>
                    <Tag color="geekblue">Default</Tag>
                  </Flex>
                </Radio>
                <Radio value={2} className="mx-0 w-full">
                  <Flex justify="space-between" gap={'large'}>
                    <Typography.Paragraph className="m-0 text-base">
                      105/14, đường 385, khu phố 6, Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, TP. Hồ Chí Minh
                    </Typography.Paragraph>
                  </Flex>
                </Radio>
              </Flex>
            </Radio.Group>
          </Form.Item>
          <Flex gap={'large'} className="w-full">
            <Form.Item className="w-full">
              <div>
                <Typography.Paragraph className="m-0 mb-2">Province</Typography.Paragraph>
                <Dropdown overlay={items(province, onProvinceChange)} trigger={['click']} placement="bottom">
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
                <Dropdown overlay={items(district, onDistrictChange)} trigger={['click']}>
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
                <Dropdown overlay={items(ward, onWardChange)} trigger={['click']}>
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
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
  );
};

export default StoreRegisterForm;
