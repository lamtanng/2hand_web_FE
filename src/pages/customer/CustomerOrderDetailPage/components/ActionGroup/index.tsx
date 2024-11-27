import { Divider, Flex } from 'antd';
import {
  CancelButton,
  ConfirmReceivedButton,
  ContactShopButton,
  RebuyButton,
  ReturnButton,
  ReviewButton,
} from '../../../../../components/elements/Buttons/CustomerOrderButtons';

export const ConfirmActions = () => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <CancelButton onClick={() => {}} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <ContactShopButton onClick={() => {}} />
      </Flex>
    </div>
  );
};

export const DeliveryActions = () => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <ConfirmReceivedButton onClick={() => {}} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <ReturnButton onClick={() => {}} />
      </Flex>
    </div>
  );
};

export const ReviewActions = () => {
  return (
    <div className="bg-blue-50">
      <Flex className="px-12 py-5" justify="end">
        <ReviewButton onClick={() => {}} />
      </Flex>
      <Divider variant="dashed" className="m-0" />
      <Flex className="px-12 py-5" justify="end">
        <RebuyButton onClick={() => {}} />
      </Flex>
    </div>
  );
};
