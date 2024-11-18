import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Typography } from 'antd';
import PhoneForm from './components/PhoneForm';
import VerifyOTPForm from './components/VerifyOTPForm';
import { useState } from 'react';
import { UserProps } from '../../../../../types/user.type';

const PhoneModal = ({
  profile,
  isModalOpen,
  setIsModalOpen,
}: {
  profile: UserProps | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setHiddenPhone(false);
    setHiddenVerify(true);
  };

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [hiddenPhone, setHiddenPhone] = useState<boolean>(false);
  const [hiddenVerify, setHiddenVerify] = useState<boolean>(true);
  const [isCounting, setCounting] = useState<boolean>(false);

  const handleCreatePhone = (phoneNumber: string | undefined) => {
    setPhoneNumber(phoneNumber);
    setHiddenPhone(true);
    setHiddenVerify(false);
    setCounting(true);
  };

  const handleBackOnClick = () => {
    setHiddenPhone(false);
    setHiddenVerify(true);
    setCounting(false);
  };

  console.log(phoneNumber);

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
          Update Phone Number
        </Typography.Title>
        <div>
          <Divider />
          <PhoneForm
            setIsModalOpen={setIsModalOpen}
            hiddenPhone={hiddenPhone}
            handleCreatePhone={handleCreatePhone}
          />
          <VerifyOTPForm
            hiddenVerify={hiddenVerify}
            handleBackOnClick={handleBackOnClick}
            setCounting={setCounting}
            isCounting={isCounting}
            phoneNumber={phoneNumber}
            profile={profile}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
