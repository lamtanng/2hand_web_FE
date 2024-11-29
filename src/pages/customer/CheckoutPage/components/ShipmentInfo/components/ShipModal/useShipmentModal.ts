import { useEffect, useState } from 'react';
import { ShipmentProps } from '../../../../../../../types/shipment.type';
import eventEmitter from '../../../../../../../utils/eventEmitter';

const useShipmentModal = (shipment: ShipmentProps[]) => {
  const [choosenShipment, setChoosenShipment] = useState<ShipmentProps>();

  useEffect(() => {
    if (shipment.length !== 0) {
      const selected = shipment.find((item: ShipmentProps) => item.service_type_id === 2)
        ? shipment.find((item: ShipmentProps) => item.service_type_id === 2)
        : shipment[0];

      setChoosenShipment(selected);
      eventEmitter.emit('shipmentChange', selected);
    }
  }, [shipment.length]);

  return {
    choosenShipment,
    setChoosenShipment,
  };
};
export default useShipmentModal;
