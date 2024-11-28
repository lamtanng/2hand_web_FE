import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Space, Typography } from 'antd';
import { useState } from 'react';

const PickupDateModal = ({
  isModalOpen,
  setIsModalOpen,
  pickupDates,
  confirmOrder
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pickupDates: any[];
  confirmOrder: (date: any) => void
}) => {
  const [choosenDate, setChoosenDate] = useState<any>();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: any) => {
    console.log(e.target.value);
    setChoosenDate(e.target.value);
  };

  const handleOk = () => {
    confirmOrder(choosenDate);
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[70vh] w-1/3 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 text-blue-600">
          Choose pick up date
        </Typography.Title>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6">
          <Radio.Group className="w-full" onChange={onChange}>
            <Space direction="vertical" className="w-full">
              {pickupDates?.map((date: any) => (
                <Radio value={date} className="w-full text-base">
                  {date.title.replace('Ca lấy', 'Picking date:')}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base" onClick={handleClose}>Cancel</Button>
            <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
              OK
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default PickupDateModal;
