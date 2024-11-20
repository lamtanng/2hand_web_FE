import { useState } from 'react';

const useShipmentModal = () => {
  const [chosenShipment, setChosenShipment] = useState<any>();

  return {
    chosenShipment,
    setChosenShipment
  };
};
export default useShipmentModal;
