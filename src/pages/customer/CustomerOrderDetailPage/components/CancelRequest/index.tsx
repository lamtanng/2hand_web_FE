import { Divider, Flex, Typography } from 'antd';
import { OrderProps } from '../../../../../types/order.type';

const CancelRequest = ({order} : {order: OrderProps}) => {
  return (
    <>
      <Divider />
      <div className="px-12 py-5">
        <Typography.Title level={5} className="m-0 mb-6">
          Cancel Request ({order.orderStageID.orderStageStatusID.status.replace(/([A-Z])/g, ' $1').trim()})
        </Typography.Title>
        <Flex className="mb-2">
          <Typography.Paragraph className="m-0 w-1/6">Reason: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">
            {order?.orderStageID?.orderStageStatusID?.orderRequestID?.reasonID.name}
          </Typography.Paragraph>
        </Flex>
        <Flex className="mb-2">
          <Typography.Paragraph className="m-0 w-1/6">Description: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">
            {order?.orderStageID?.orderStageStatusID?.orderRequestID?.description}
          </Typography.Paragraph>
        </Flex>
      </div>
    </>
  );
};

export default CancelRequest;
