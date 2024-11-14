import { Form } from 'antd';
import { initializeApp } from 'firebase/app';
import { ApplicationVerifier, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import SubmitButton from '../../components/elements/Buttons/SubmitButton';
import CustomFormItem from '../../components/elements/ControlledComponents/ControlledInput';
import { firebaseConfig } from '../../configs/firebase';
import { useEffect, useState } from 'react';
interface PhoneVerificationProps {
  phoneNumber: string;
}

const PhoneVerification = () => {
  const [recapcha, setRecapcha] = useState<ApplicationVerifier | undefined>(undefined);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.useDeviceLanguage();
  const method = useForm<PhoneVerificationProps>({});

  useEffect(() => {
    const runCapcha = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      //   defaultCountry: 'VN',
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // handleLogin();
        console.log(response);
      },
    });
    setRecapcha(runCapcha);
  }, []);

  const handleLogin = async ({ phoneNumber }: PhoneVerificationProps) => {
    console.log('>>>>>>.');
    const res = await signInWithPhoneNumber(auth, phoneNumber, recapcha);
    console.log(res);
  };

  const { handleSubmit } = method;
  return (
    <>
      {/* <div id="sign-in-button"></div> */}
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleLogin)}>
          <CustomFormItem name="phoneNumber" hint="Email" label="Email" isRequired={true} />
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </FormProvider>
    </>
  );
};

export default PhoneVerification;
