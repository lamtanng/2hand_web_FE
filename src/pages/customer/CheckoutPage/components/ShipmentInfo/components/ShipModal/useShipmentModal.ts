import { useState } from 'react';
import { ShipmentProps } from '../../../../../../../types/shipment.type';

const useShipmentModal = () => {
  const [chosenShipment, setChosenShipment] = useState<ShipmentProps>();

  return {
    chosenShipment,
    setChosenShipment
  };
};
export default useShipmentModal;
