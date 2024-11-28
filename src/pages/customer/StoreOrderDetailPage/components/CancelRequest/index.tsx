import { Divider, Flex, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CancelingActions } from '../ActionGroup';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import useCancelRequest from './useCancelRequest';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';

const CancelRequest = ({ order }: { order: OrderProps }) => {
  const { processRequest, setReplyMessage } = useCancelRequest(order);
  const handleApprove = () => {
    processRequest(ReplyStatus.Succeeded);
  };
  const handleReject = () => {
    processRequest(ReplyStatus.Rejected);
  };
  return (
    <>
      <Divider />
      <div className="px-12 py-5">
        <Typography.Title level={5} className="m-0 mb-6">
          Cancel Request ({order.orderStageID.orderStageStatusID.status.replace(/([A-Z])/g, ' $1').trim()})
        </Typography.Title>
        <Flex className="mb-2">
          <Typography.Paragraph className="m-0 w-1/6">Reason: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">{order.orderStageID.orderStageStatusID.orderRequestID?.reasonID.name}</Typography.Paragraph>
        </Flex>
        <Flex className="mb-2">
          <Typography.Paragraph className="m-0 w-1/6">Description: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">{order.orderStageID.orderStageStatusID.orderRequestID?.description}</Typography.Paragraph>
        </Flex>
        {order.orderStageID.orderStageStatusID.status === OrderStageStatus.RequestToSeller && (
          <>
            <Flex vertical gap={'small'} className="mb-6">
              <Typography.Paragraph className="m-0">Reply message: </Typography.Paragraph>
              <TextArea
                showCount
                maxLength={500}
                autoSize={{ minRows: 3 }}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="mb-6"
              />
            </Flex>
            <CancelingActions handleApprove={handleApprove} handleReject={handleReject} />
          </>
        )}
      </div>
    </>
  );
};

export default CancelRequest;
