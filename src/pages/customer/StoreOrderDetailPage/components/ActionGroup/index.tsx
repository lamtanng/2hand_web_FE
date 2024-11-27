import { Divider, Flex } from 'antd';
import {
  ApproveRequestButton,
  CancelButton,
  ConfirmButton,
  DeliveringButton,
  RejectRequestButton,
} from '../../../../../components/elements/Buttons/StoreOrderButtons';

export const ConfirmActions = ( { getPickupDate }: { getPickupDate: () => void }) => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <CancelButton onClick={() => {}} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <ConfirmButton onClick={getPickupDate} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = ({deliveringOrder}: {deliveringOrder: () => void}) => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <DeliveringButton onClick={deliveringOrder} isLoading={false} />
      </Flex>
    </div>
  );
};

export const CancelingActions = () => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <ApproveRequestButton onClick={() => {}} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <RejectRequestButton onClick={() => {}} />
      </Flex>
    </div>
  );
};
