import { Link } from 'react-router-dom';
import { authPaths } from '../../../../constants/apiPaths/authPaths';
import { FormProvider } from 'react-hook-form';
import { Form } from 'antd';
import CustomFormItem from '../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../components/elements/Buttons/SubmitButton';
import useSignupForm from './useSignupForm';
import { SignupFormProps } from './Signup.constant';

const SignupForm = ({ hiddenSignup, handleSignupOnClick, isSubmitting, setSubmitting }: SignupFormProps) => {
  const { handleSignup, handleSubmit, method } = useSignupForm(handleSignupOnClick, setSubmitting);

  return (
    <>
      <div className="form-container w-8/12" hidden={hiddenSignup}>
        <p className="font-sans text-[46px] font-extrabold">Getting Started</p>
        <p className="text-left font-sans text-base text-gray-600">
          Already have an account?{' '}
          <Link to={`/${authPaths.loginPath}`} className="font-medium no-underline">
            Sign in
          </Link>
        </p>
        <h2 className="font-sans">Sign Up</h2>
        <FormProvider {...method}>
          <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleSignup)}>
            {/* <CustomFormItem name="email" hint="Email" label="Email" isRequired={true} /> */}
            <CustomFormItem hint="Phone number" name="phoneNumber" label="Phone Number" maxLength={10} />
            <CustomFormItem name="password" hint="Password" type="password" label="Password" isRequired={true} />
            <CustomFormItem
              name="confirmPassword"
              hint="Confirm Password"
              type="password"
              label="Confirm Password"
              isRequired={true}
            />
            <Form.Item>
              <SubmitButton isSubmitting={isSubmitting} />
            </Form.Item>
          </Form>
        </FormProvider>
        <Link to={'/'} className="font-sans no-underline">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
