import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space, Typography } from 'antd';
import React from 'react';

const ShipModal = ({
  shippingFee,
  isModalOpen,
  setIsModalOpen,
}: {
  shippingFee: any[];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  console.log(shippingFee);

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
          Shipping Method
        </Typography.Title>
        <Divider />
        <Radio.Group className="w-full">
          <Space direction="vertical" className="w-full">
            {shippingFee.map((item: any) => (
              <Radio value={item} className="w-full">
                Hello
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6 pb-6"></div>
      </div>
    </div>
  );
};

export default ShipModal;
