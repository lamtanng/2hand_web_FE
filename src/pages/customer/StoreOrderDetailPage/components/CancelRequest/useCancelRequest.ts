import { useState } from 'react';
import { OrderProps } from '../../../../../types/order.type';
import { handleError } from '../../../../../utils/handleError';
import { orderRequestsAPIs } from '../../../../../apis/orderRequest.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import { ReplyRequestProps } from '../../../../../types/http/orderRequest.type';
import { ReasonProps } from '../../../../../types/http/reason.type';

const useCancelRequest = (order: OrderProps | undefined) => {
  const [replyMessage, setReplyMessage] = useState<ReasonProps>();
  const [selectedDecision, setSelectedDecision] = useState<string>(ReplyStatus.Succeeded);

  const processRequest = async () => {
    try {
      const message = selectedDecision === ReplyStatus.Succeeded ? 'Approved' : replyMessage?.name;
      const data: ReplyRequestProps = {
        _id: order?.orderStageID.orderStageStatusID.orderRequestID?._id,
        replyMessage: message,
        replyStatus: selectedDecision,
      };
      console.log(data);
      await orderRequestsAPIs.replyRequest(data);
      eventEmitter.emit('orderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };
  return { setReplyMessage, processRequest, selectedDecision, replyMessage, setSelectedDecision };
};
export default useCancelRequest;
