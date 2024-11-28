import { Flex } from 'antd';
import { CancelButton, ConfirmReceivedButton, RebuyButton, ReturnButton } from '../../../../../components/elements/Buttons/CustomerOrderButtons';

export const ConfirmActions = ({openCancelModal}: {openCancelModal: () => void}) => {
  return (
    <div id="actions" className="mt-6">
      <Flex justify="end" gap={'middle'}>
        <CancelButton onClick={openCancelModal} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = ({receiveOrder}: {receiveOrder: () => void}) => {
    return (
      <div id="actions" className="mt-6">
        <Flex justify="end" gap={'middle'}>
          <ReturnButton onClick={() => {}} />
          <ConfirmReceivedButton onClick={receiveOrder} />
        </Flex>
      </div>
    );
  };

  export const RebuyActions = () => {
    return (
      <div id="actions" className="mt-6">
        <Flex justify="end" gap={'middle'}>
          <RebuyButton onClick={() => {}} />
        </Flex>
      </div>
    );
  };
