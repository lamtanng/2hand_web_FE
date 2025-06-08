import { Flex } from 'antd';
import {
  CancelButton,
  ConfirmReceivedButton,
  RebuyButton
} from '../../../../../components/elements/Buttons/CustomerOrderButtons';

export const ConfirmActions = ({openCancelModal}: {openCancelModal: () => void}) => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <CancelButton onClick={openCancelModal} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = ({receiveOrder}: {receiveOrder: () => void}) => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <ConfirmReceivedButton onClick={receiveOrder} />
      </Flex>
      {/* <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <ReturnButton onClick={() => {}} />
      </Flex> */}
    </div>
  );
};

export const RebuyActions = () => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <RebuyButton onClick={() => {}} />
      </Flex>
    </div>
  );
};
