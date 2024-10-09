import { Form } from 'antd';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../components/elements/ControlledComponents/ControlledInput';
import useLoginForm from './useLoginForm';
import SubmitButton from '../../../../components/elements/Buttons/SubmitButton';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../../constants/apiPaths/authPaths';

// Form Component
const LoginForm: React.FC = () => {
  const { handleLogin, handleSubmit, method } = useLoginForm();

  return (
    <div className="form-container w-8/12">
      <p className="font-sans text-[46px] font-extrabold">Welcome Back</p>
      <p className="text-left font-sans text-base text-gray-600">
        Don't have account?{' '}
        <Link to={`/${authPaths.signupPath}`} className="font-medium no-underline">
          Sign up
        </Link>
      </p>
      <h2 className="font-sans">Sign In</h2>
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleLogin)}>
          <CustomFormItem name="email" hint="Email" label="Email" isRequired={true} />
          <CustomFormItem name="password" hint="Password" type="password" label="Password" isRequired={true} />
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </FormProvider>
      <Link to={'/'} className='font-sans no-underline'>Back to Home</Link>
    </div>
  );
};

export default LoginForm;
