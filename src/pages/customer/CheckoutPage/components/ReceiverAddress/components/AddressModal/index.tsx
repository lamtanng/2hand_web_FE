import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Typography } from 'antd';
import AddressList from './components/AddressList';
import { AddressProps } from '../../../../../../../types/address.type';
import { UserProps } from '../../../../../../../types/user.type';
import { useState } from 'react';

const AddressModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setValue,
  value,
  profile,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: AddressProps[] | undefined;
  setValue: React.Dispatch<React.SetStateAction<AddressProps | undefined>>;
  value: AddressProps | undefined;
  profile: UserProps | undefined;
}) => {
  const [radioHidden, setRadioHidden] = useState<boolean>(false);
  const [formHidden, setFormHidden] = useState<boolean>(true);

  const handleClose = () => {
    setIsModalOpen(false);
    setFormHidden(true);
    setRadioHidden(false);
  };
  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[70vh] w-1/2 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 text-blue-600">
          Receiver's Address
        </Typography.Title>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6 pb-6">
          <AddressList
            radioHidden={radioHidden}
            formHidden={formHidden}
            setRadioHidden={setRadioHidden}
            setFormHidden={setFormHidden}
            profile={profile}
            data={data}
            setIsModalOpen={setIsModalOpen}
            setValue={setValue}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
