import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Dropdown, Flex, Form, MenuProps, Space, Typography } from 'antd';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../../../components/elements/Buttons/SubmitButton';
import useAddressForm from './useAddressForm';

const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

const AddressModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleSubmit, method } = useAddressForm();
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-screen w-1/3 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 text-blue-600">
          Receiver's Address
        </Typography.Title>
        <div>
          <Divider />
          <FormProvider {...method}>
            <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit}>
              <Flex justify="space-between" gap={'large'}>
                <div className="w-1/2">
                  <CustomFormItem name="name" hint="Name" label="Name" isRequired={true} />
                </div>
                <div className="w-1/2">
                  <CustomFormItem name="phoneNumber" hint="Phone Number" label="Phone Number" isRequired={true} />
                </div>
              </Flex>
              <CustomFormItem name="address" hint="Address" label="Address" isRequired={true} />
              <Flex justify="space-between">
                <Form.Item>
                  <Dropdown.Button menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>Click me</Space>
                    </a>
                  </Dropdown.Button>
                </Form.Item>
                <Form.Item>
                  <Dropdown.Button menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>Click me</Space>
                    </a>
                  </Dropdown.Button>
                </Form.Item>
                <Form.Item>
                  <Dropdown.Button menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>Click me</Space>
                    </a>
                  </Dropdown.Button>
                </Form.Item>
              </Flex>
              <Form.Item>
                <Checkbox>Set as default address</Checkbox>
              </Form.Item>
              <Flex justify="end" gap={'large'}>
                <Button size='large' onClick={handleClose}>Cancel</Button>
                <Form.Item className="m-0">
                  <SubmitButton />
                </Form.Item>
              </Flex>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
