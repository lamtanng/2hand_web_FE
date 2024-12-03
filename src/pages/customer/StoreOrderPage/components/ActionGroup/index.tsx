import { Flex } from 'antd';
import {
  CancelButton,
  ConfirmButton,
  DeliveringButton,
} from '../../../../../components/elements/Buttons/StoreOrderButtons';
export const ConfirmActions = ({ getPickupDate, openCancelModal }: { getPickupDate: () => void, openCancelModal: () => void }) => {
  return (
    <div id="actions">
      <Flex justify="end" gap={'middle'}>
        <CancelButton onClick={openCancelModal} />
        <ConfirmButton onClick={getPickupDate} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = ({
  deliveringOrder,
  isLoading,
}: {
  deliveringOrder: () => void;
  isLoading: boolean;
}) => {
  return (
    <div id="actions">
      <Flex justify="end" gap={'middle'}>
        <DeliveringButton onClick={deliveringOrder} isLoading={isLoading} />
      </Flex>
    </div>
  );
};
