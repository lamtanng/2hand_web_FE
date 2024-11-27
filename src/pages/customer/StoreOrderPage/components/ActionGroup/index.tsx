import { Flex } from 'antd';
import {
  ApproveRequestButton,
  CancelButton,
  ConfirmButton,
  DeliveringButton,
  RejectRequestButton,
} from '../../../../../components/elements/Buttons/StoreOrderButtons';
export const ConfirmActions = ({ getPickupDate }: { getPickupDate: () => void }) => {
  return (
    <div id="actions" className="mt-6">
      <Flex justify="end" gap={'middle'}>
        <CancelButton onClick={() => {}} />
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
    <div id="actions" className="mt-6">
      <Flex justify="end" gap={'middle'}>
        <DeliveringButton onClick={deliveringOrder} isLoading={isLoading} />
      </Flex>
    </div>
  );
};

export const CancelingActions = () => {
  return (
    <div id="actions" className="mt-6">
      <Flex justify="end" gap={'middle'}>
        <RejectRequestButton onClick={() => {}} />
        <ApproveRequestButton onClick={() => {}} />
      </Flex>
    </div>
  );
};
