import { Flex } from 'antd';
import {
  CancelButton,
  ConfirmReceivedButton,
  RebuyButton,
} from '../../../../../components/elements/Buttons/CustomerOrderButtons';

export const ConfirmActions = ({ openCancelModal }: { openCancelModal: () => void }) => {
  return (
    <div id="actions" className="w-1/2">
      <Flex justify="end" gap={'middle'}>
        <CancelButton onClick={openCancelModal} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = ({ receiveOrder }: { receiveOrder: () => void; rebuyProduct: () => void }) => {
  return (
    <div id="actions">
      <Flex justify="end" gap={'middle'}>
        {/* <ReturnButton onClick={rebuyProduct} /> */}
        <ConfirmReceivedButton onClick={receiveOrder} />
      </Flex>
    </div>
  );
};

export const RebuyActions = ({ rebuyProduct }: { rebuyProduct: () => void }) => {
  return (
    <div id="actions">
      <Flex justify="end" gap={'middle'}>
        <RebuyButton onClick={rebuyProduct} />
      </Flex>
    </div>
  );
};
