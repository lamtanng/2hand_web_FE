import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, RadioChangeEvent, Typography } from 'antd';
import React, { useState } from 'react';
import useShipmentModal from './useShipmentModal';
import { CartItemProps } from '../../../../../../../types/cart.type';
import { StoreProps } from '../../../../../../../types/store.type';
import { AddressProps } from '../../../../../../../types/address.type';

const ShipModal = ({
  isModalOpen,
  setIsModalOpen,
  service,
  product,
  store,
  address,
  selectedShipment,
  setSelectedShipment,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  service: any[];
  product: CartItemProps[];
  store: StoreProps;
  address: AddressProps | undefined;
  selectedShipment: any;
  setSelectedShipment: React.Dispatch<any>;
}) => {
  const { shipment } = useShipmentModal(store, address, product, service, setSelectedShipment);
  const [chosenShipment, setChosenShipment] = useState<any>(selectedShipment);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setChosenShipment(e.target.value);
  };

  const handleOk = () => {
    setSelectedShipment(chosenShipment);
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[70vh] w-1/3 rounded-xl bg-white px-6 pt-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 text-blue-600">
          Shipping Method
        </Typography.Title>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6 pb-6">
          <Radio.Group className="w-full" defaultValue={chosenShipment} onChange={onChange}>
            <Flex vertical gap={'large'} className="w-full">
              {shipment.map((item: any) => (
                <Radio value={item} className="w-full">
                  <Flex className="ml-2 min-w-60" justify="space-between" gap={'large'}>
                    <Typography.Paragraph className="m-0 text-base">
                      {item.service_type_id === 2 ? 'Light weight:' : 'Heavy weight:'}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-base text-blue-600">
                      {new Intl.NumberFormat().format(item.total)} VND
                    </Typography.Paragraph>
                  </Flex>
                </Radio>
              ))}
            </Flex>
          </Radio.Group>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
              OK
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ShipModal;
