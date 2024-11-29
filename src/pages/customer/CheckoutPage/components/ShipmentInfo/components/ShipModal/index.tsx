import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, RadioChangeEvent, Typography } from 'antd';
import React from 'react';
import useShipmentModal from './useShipmentModal';
import eventEmitter from '../../../../../../../utils/eventEmitter';
import { ShipmentProps } from '../../../../../../../types/shipment.type';

const ShipModal = ({
  isModalOpen,
  setIsModalOpen,
  shipment,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shipment: ShipmentProps[];
}) => {
  const { choosenShipment, setChoosenShipment } = useShipmentModal(shipment);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setChoosenShipment(e.target.value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    eventEmitter.emit('shipmentChange', choosenShipment);
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
        <div className="px-6 pb-6">
          <Radio.Group className="w-full" defaultValue={choosenShipment} onChange={onChange}>
            <Flex vertical gap={'large'} className="w-full">
              {shipment.map((item: ShipmentProps) => (
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
