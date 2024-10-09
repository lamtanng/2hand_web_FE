import { useState } from 'react';
import SignupForm from './components/SignupForm';
import VerifyOTPForm from './components/VerifyOTPForm';
import { UserProps } from '../../types/user.type';

const Signup = () => {
  const [account, setAccount] = useState<UserProps>({});
  const [hiddenSignup, setHiddenSignup] = useState<boolean>(false);
  const [hiddenVerify, setHiddenVerify] = useState<boolean>(true);
  const [isCounting, setCounting] = useState<boolean>(false);

  const handleSignupOnClick = (account: UserProps) => {
    setHiddenSignup(true);
    setHiddenVerify(false);
    setAccount(account);
    setCounting(true);
  };

  const handleBackOnClick = () => {
    setHiddenSignup(false);
    setHiddenVerify(true);
    setCounting(false);
  };

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex w-full items-center justify-center lg:w-10/12">
          <SignupForm hiddenSignup={hiddenSignup} handleSignupOnClick={handleSignupOnClick} />
          <VerifyOTPForm
            hiddenVerify={hiddenVerify}
            account={account}
            handleBackOnClick={handleBackOnClick}
            isCounting={isCounting}
            setCounting={setCounting}
          />
        </div>
        <div className="relative hidden h-full w-full items-center justify-center bg-blue-50 lg:flex">
          <div className="h-60 w-60 animate-bounce rounded-full bg-gradient-to-tr from-blue-700 to-blue-200"></div>
          <div className="absolute bottom-0 h-1/2 w-full bg-white/10 backdrop-blur-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Signup;
