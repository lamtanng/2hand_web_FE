import { Flex } from 'antd';
import { CancelButton, ConfirmReceivedButton, ContactShopButton, RebuyButton, ReturnButton } from '../../../../../components/elements/Buttons/CustomerOrderButtons';

export const ConfirmActions = () => {
  return (
    <div id="actions" className="mt-6">
      <Flex justify="end" gap={'middle'}>
        <ContactShopButton onClick={() => {}} />
        <CancelButton onClick={() => {}} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = () => {
    return (
      <div id="actions" className="mt-6">
        <Flex justify="end" gap={'middle'}>
          <ReturnButton onClick={() => {}} />
          <ConfirmReceivedButton onClick={() => {}} />
        </Flex>
      </div>
    );
  };

  export const ReviewActions = () => {
    return (
      <div id="actions" className="mt-6">
        <Flex justify="end" gap={'middle'}>
          <RebuyButton onClick={() => {}} />
        </Flex>
      </div>
    );
  };
