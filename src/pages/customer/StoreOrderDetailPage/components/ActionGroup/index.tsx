import { Divider, Flex } from 'antd';
import {
  ApproveRequestButton,
  CancelButton,
  ConfirmButton,
  DeliveringButton,
  RejectRequestButton,
} from '../../../../../components/elements/Buttons/StoreOrderButtons';

export const ConfirmActions = ({
  getPickupDate,
  openCancelModal,
}: {
  getPickupDate: () => void;
  openCancelModal: () => void;
}) => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <CancelButton onClick={openCancelModal} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
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
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <DeliveringButton onClick={deliveringOrder} isLoading={isLoading} />
      </Flex>
    </div>
  );
};

export const CancelingActions = ({
  handleApprove,
  handleReject,
}: {
  handleApprove: () => void;
  handleReject: () => void;
}) => {
  return (
    <Flex gap={'large'} justify="end">
      <RejectRequestButton onClick={handleReject} />
      <ApproveRequestButton onClick={handleApprove} />
    </Flex>
  );
};
