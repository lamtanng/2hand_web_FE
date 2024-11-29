import { Divider, Flex, Typography, Image, TabsProps, Tabs, Avatar, Rate } from 'antd';
import defaultPic from '../../../assets/blob.jpg';
import { UserOutlined } from '@ant-design/icons';
import useAccountPage from '../AccountPage/useAccountPage';
import useCustomerReviewPage from './useCustomerReviewPage';
import dayjs from 'dayjs';

const MyReviews = () => {
  const { profile } = useAccountPage();
  const { reviews } = useCustomerReviewPage(profile);

  const reviewedList = reviews.reverse().map((item: any) => (
    <div id="reviewed-list">
      <div id="review">
        <Flex gap={'large'}>
          <Avatar size={'large'} icon={<UserOutlined />} className="w-1/10" />
          <Flex gap={'middle'} vertical className="w-full">
            <Flex gap={'small'} vertical>
              <Typography.Paragraph className="m-0 text-base">{`${item.reviewerID.firstName} ${item.reviewerID.lastName}`}</Typography.Paragraph>
              <Rate allowHalf defaultValue={item.rate} disabled />
              <Typography.Paragraph className="m-0 text-gray-500">
                {dayjs(item.createdAt.toString()).format('DD/MM/YYYY')}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-gray-500">
                Product name: {item.productID.name}
              </Typography.Paragraph>
            </Flex>
            <Typography.Paragraph className="m-0 text-base">{item.content}</Typography.Paragraph>
            {item.image.map((src: string) => (
              <Image alt="" src={src} fallback={defaultPic} width={'10%'} />
            ))}
            {item.replyMessage && (
              <Flex className="rounded-md bg-blue-50 p-6" vertical gap={'small'}>
                <Typography.Paragraph className="m-0 text-base font-semibold">
                  Response from seller:
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">{item.replyMessage}</Typography.Paragraph>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Divider />
      </div>
    </div>
  ));

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My Reivews',
      children: reviewedList,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} className="px-12 py-5" />
    </div>
  );
};

export default MyReviews;
