import { useState } from 'react';
import { OrderProps } from '../../../../../types/order.type';
import { handleError } from '../../../../../utils/handleError';
import { orderRequestsAPIs } from '../../../../../apis/orderRequest.api';
import eventEmitter from '../../../../../utils/eventEmitter';

const useCancelRequest = (order: OrderProps) => {
  const [replyMessage, setReplyMessage] = useState<string>('');

  const processRequest = async (replyStatus: string) => {
    try {
      const data = {
        _id: order.orderStageID.orderStageStatusID.orderRequestID?._id,
        replyMessage: replyMessage,
        replyStatus: replyStatus,
      };
      console.log(data);
      await orderRequestsAPIs.replyRequest(data);
      eventEmitter.emit('orderDetailStageChanged', order._id);
    } catch (error) {
      handleError(error);
    }
  };
  return { setReplyMessage, processRequest };
};
export default useCancelRequest;
