import useStoreForm from './useStoreRegisterForm';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import { Form } from 'antd';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';

const StoreRegisterForm = () => {
    const { method, handleSubmit } = useStoreForm();
  return (
    <div className="mb-5 rounded-xl bg-white p-8 shadow-sm">
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit}>
          <CustomFormItem name="name" hint="Name" label="Name" isRequired={true} />
          <CustomFormItem name="description" hint="Description" label="Description" isRequired={true} />
          <CustomFormItem name="address" hint="Address" label="Address" isRequired={true} />
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
  );
};

export default StoreRegisterForm;
