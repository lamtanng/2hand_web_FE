import { Button, Divider, Dropdown, Flex, MenuProps, Typography } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
import { CancelingActions } from '../ActionGroup';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import useCancelRequest from './useCancelRequest';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import { DownOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const CancelRequest = ({ order }: { order: OrderProps }) => {
  const { processRequest, setReplyMessage, selectedDecision, setSelectedDecision } = useCancelRequest(order);
  const handleSend = () => {
    processRequest();
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setReplyMessage(JSON.parse(e.key));
  };

  const menuProps = {
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
      <Divider />
      <div className="px-12 py-5">
        <Typography.Title level={5} className="m-0 mb-6">
          Cancel Request ({order.orderStageID.orderStageStatusID.status.replace(/([A-Z])/g, ' $1').trim()})
        </Typography.Title>
        <Flex className="mb-2">
          <Typography.Paragraph className="m-0 w-1/6">Reason: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">
            {order.orderStageID.orderStageStatusID.orderRequestID?.reasonID.name}
          </Typography.Paragraph>
        </Flex>
        <Flex className="mb-4">
          <Typography.Paragraph className="m-0 w-1/6">Description: </Typography.Paragraph>
          <Typography.Paragraph className="m-0">
            {order.orderStageID.orderStageStatusID.orderRequestID?.description}
          </Typography.Paragraph>
        </Flex>
        {order.orderStageID.orderStageStatusID.status === OrderStageStatus.RequestToSeller && (
          <>
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
              // <Flex gap={'small'} className="mb-6" align="center">
              //   <Typography.Paragraph className="m-0 w-1/6">Reject reason: </Typography.Paragraph>
              //   <Dropdown menu={menuProps} trigger={['click']}>
              //     <Button className="h-10 w-full">
              //       <Flex justify="space-between" className="w-full">
              //         <Typography.Paragraph className="m-0 truncate">{'Select reason'}</Typography.Paragraph>
              //         <DownOutlined />
              //       </Flex>
              //     </Button>
              //   </Dropdown>
              // </Flex>
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
            )}

            <CancelingActions handleSend={handleSend} />
          </>
        )}
      </div>
    </>
  );
};

export default CancelRequest;
