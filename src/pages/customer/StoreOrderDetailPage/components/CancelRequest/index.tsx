import { Button, Divider, Dropdown, Flex, MenuProps, Typography } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
import { CancelingActions } from '../ActionGroup';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import useCancelRequest from './useCancelRequest';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import { DownOutlined } from '@ant-design/icons';
import { OrderStageTrackingProps } from '../../../../../types/orderTracking.type';
import { OrderStageStatusProps } from '../../../../../types/orderStageStatus.type';
import { formattedOrderStageStatus } from '../../../../../utils/formattedOrderStageStatus';
import { ReasonProps } from '../../../../../types/http/reason.type';

const CancelRequest = ({
  order,
  stages,
  rejectReasons,
}: {
  order: OrderProps | undefined;
  stages: OrderStageTrackingProps[];
  rejectReasons: ReasonProps[];
}) => {
  const { processRequest, setReplyMessage, selectedDecision, setSelectedDecision, replyMessage } =
    useCancelRequest(order);
  const handleSend = () => {
    processRequest();
  };

  const cancelRequests =
    stages
      .find((item: OrderStageTrackingProps) => item?.orderStageStatus?.length > 1)
      ?.orderStageStatus?.filter((item: OrderStageStatusProps) => item.status !== OrderStageStatus.Active) || [];

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case ReplyStatus.Pending:
        return 'text-yellow-500';
      case ReplyStatus.Rejected:
        return 'text-red-500';
      case ReplyStatus.Succeeded:
        return 'text-green-500';
    }
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setReplyMessage(JSON.parse(e.key));
  };

  const items: MenuProps['items'] = rejectReasons.map((reason: ReasonProps) => ({
    key: JSON.stringify(reason),
    label: reason.name,
  }));

  console.log(items)

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
  };

  const decisions = [
    {
      key: ReplyStatus.Succeeded,
      label: 'Approve',
    },
    {
      key: ReplyStatus.Rejected,
      label: 'Reject',
    },
  ];

  return (
    <>
      <Divider className="m-0" />
      <div>
        <Typography.Title level={4} className="m-0 px-12 py-6 text-blue-600">
          Cancel Requests ({cancelRequests.length})
        </Typography.Title>
        {cancelRequests.map((item: OrderStageStatusProps) => (
          <>
            <Divider variant="dashed" className="m-0" />
            <div className="px-12 py-6">
              <Flex className="mb-2">
                <Typography.Title level={5} className="m-0 w-1/6 text-blue-600">
                  {formattedOrderStageStatus(item.status)}
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
                <Typography.Paragraph
                  className={`m-0 font-semibold ${getStatusColor(item?.orderRequestID?.replyStatus)}`}
                >
                  {item.orderRequestID?.replyStatus.toUpperCase()}
                </Typography.Paragraph>
              </Flex>
              {item?.orderRequestID?.replyMessage && (
                <Flex className="mb-2">
                  <Typography.Paragraph className="m-0 w-1/6">Reply Message: </Typography.Paragraph>
                  <Typography.Paragraph className={`m-0`}>{item.orderRequestID?.replyMessage}</Typography.Paragraph>
                </Flex>
              )}
            </div>
            {item.status === OrderStageStatus.RequestToSeller &&
              item.orderRequestID?.replyStatus === ReplyStatus.Pending && (
                <div className="px-12 pb-6">
                  <Flex gap={'large'}>
                    {decisions.map((item: any) => (
                      <label
                        key={1}
                        className={`relative mb-6 flex cursor-pointer flex-col items-center rounded-md border border-solid px-4 py-2 transition-all duration-200 ${
                          selectedDecision === item.key
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } `}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={item.key}
                          checked={selectedDecision === item.key}
                          onChange={(e) => setSelectedDecision(e.currentTarget.value)}
                          className="hidden"
                        />
                        <span
                          className={`text-base font-medium ${selectedDecision === item.key ? 'text-blue-600' : 'text-gray-900'} `}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </Flex>
                  {selectedDecision === ReplyStatus.Rejected && (
                    <Flex gap={'small'} className="mb-6" align="center">
                      <Typography.Paragraph className="m-0 w-1/6">Reject reason <span className='text-red-600'>*</span>: </Typography.Paragraph>
                      <Dropdown menu={menuProps} trigger={['click']} className="mb-6">
                        <Button className="h-10 w-full">
                          <Flex justify="space-between" className="w-full">
                            <Typography.Paragraph className="m-0 truncate">
                              {replyMessage ? replyMessage.name : 'Select reason'}
                            </Typography.Paragraph>
                            <DownOutlined />
                          </Flex>
                        </Button>
                      </Dropdown>
                    </Flex>
                  )}

                  <CancelingActions handleSend={handleSend} isDirty={!replyMessage} />
                </div>
              )}
          </>
        ))}
      </div>
    </>
  );
};

export default CancelRequest;
