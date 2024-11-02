import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import AddressList from './components/AddressList';
import AddressForm from './components/AddressForm';
import { useState } from 'react';

const data = {
  userID: 1,
  name: 'Luong Bui',
  phoneNumber: '0785352677',
  address: [
    {
      name: 'Luong Bui',
      phoneNumber: '0785352677',
      address: '105/14, đường 385, khu phố 6',
      ward: 'Phường Tăng Nhơn Phú A',
      district: 'Thành Phố Thủ Đức',
      city: 'TP. Hồ Chí Minh',
    },
    {
      name: 'Luong Bui',
      phoneNumber: '0785352677',
      address: 'Trường Đại Học Sư Phạm Kỹ Thuật, Đường Võ Văn Ngân',
      ward: 'Phường Linh Chiểu',
      district: 'Thành Phố Thủ Đức',
      city: 'TP. Hồ Chí Minh',
    },
  ],
};

const AddressModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [radioHidden, setRadioVisible] = useState<boolean>(false);
  const [formHidden, setFormVisible] = useState<boolean>(true);
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
        <AddressList
          data={data}
          setIsModalOpen={setIsModalOpen}
          hidden={radioHidden}
          setFormVisible={setFormVisible}
          setRadioVisible={setRadioVisible}
        />
        <AddressForm hidden={formHidden} setFormVisible={setFormVisible} setRadioVisible={setRadioVisible} />
      </div>
    </div>
  );
};

export default AddressModal;
