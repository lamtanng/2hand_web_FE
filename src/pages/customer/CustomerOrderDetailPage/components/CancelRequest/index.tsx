import { Divider, Flex, Typography } from 'antd';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';

const CancelRequest = ({ stages }: { stages: any[] }) => {
  const cancelRequests = stages
    .find((item: any) => item.orderStageStatus.length > 1)
    .orderStageStatus.filter((item: any) => item.status !== OrderStageStatus.Active);

  const getStatusColor = (status: string) => {
    switch (status) {
      case ReplyStatus.Pending:
        return 'text-yellow-500';
      case ReplyStatus.Rejected:
        return 'text-red-500';
      case ReplyStatus.Succeeded:
        return 'text-green-500';
    }
  };

  return (
    <>
      <Divider className="m-0" />
      <div>
        <Typography.Title level={4} className="m-0 px-12 py-6 text-blue-600">
          Cancel Requests ({cancelRequests.length})
        </Typography.Title>
        {cancelRequests.map((item: any) => (
          <>
            <Divider variant="dashed" className="m-0" />
            <div className="px-12 py-6">
              <Flex className="mb-2">
                <Typography.Title level={5} className="m-0 w-1/6 text-blue-600">
                  {item.status.replace(/([A-Z])/g, ' $1').trim()}
                </Typography.Title>
              </Flex>
              <Flex className="mb-2">
                <Typography.Paragraph className="m-0 w-1/6">Reason: </Typography.Paragraph>
                <Typography.Paragraph className="m-0">{item.orderRequestID?.reasonID.name}</Typography.Paragraph>
              </Flex>
              <Flex className="mb-2">
                <Typography.Paragraph className="m-0 w-1/6">Description: </Typography.Paragraph>
                <Typography.Paragraph className="m-0">{item.orderRequestID?.description}</Typography.Paragraph>
              </Flex>
              <Flex className="mb-2">
                <Typography.Paragraph className="m-0 w-1/6">Status: </Typography.Paragraph>
                <Typography.Paragraph className={`m-0 font-semibold ${getStatusColor(item.orderRequestID.replyStatus)}`}>
                  {item.orderRequestID?.replyStatus.toUpperCase()}
                </Typography.Paragraph>
              </Flex>
              {item.orderRequestID.replyMessage && (
                <Flex className="mb-2">
                  <Typography.Paragraph className="m-0 w-1/6">Reply Message: </Typography.Paragraph>
                  <Typography.Paragraph className={`m-0`}>
                    {item.orderRequestID?.replyMessage}
                  </Typography.Paragraph>
                </Flex>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CancelRequest;
