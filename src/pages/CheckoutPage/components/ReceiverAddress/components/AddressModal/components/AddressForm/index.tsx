import useAddressForm from './useAddressFrom';
import { FormProvider } from 'react-hook-form';
import { Button, Checkbox, Divider, Dropdown, Flex, Form, MenuProps, Space } from 'antd';
import CustomFormItem from '../../../../../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../../../../../components/elements/Buttons/SubmitButton';

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

const AddressForm = ({
  hidden,
  setFormVisible,
  setRadioVisible,
}: {
  hidden: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleSubmit, method } = useAddressForm();

  return (
    <div hidden={hidden}>
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
            <Button
              size="large"
              onClick={() => {
                setFormVisible(true);
                setRadioVisible(false);
              }}
            >
              Cancel
            </Button>
            <Form.Item className="m-0">
              <SubmitButton />
            </Form.Item>
          </Flex>
        </Form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
