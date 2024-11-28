import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Typography, Image, Dropdown, MenuProps, Divider, Rate } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';
import dayjs from 'dayjs';

const items: MenuProps['items'] = [
  {
    label: <a href="#">Report</a>,
    key: '0',
  },
];

const ReviewItem = ({review}: {review: any}) => {
  return (
    <div id="review-item">
      <Flex gap={'large'} align="start">
        <Avatar size={'large'} icon={<UserOutlined />} />
        <Flex gap={'middle'} className="flex-grow" vertical>
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">{`${review?.reviewerID?.firstName} ${review?.reviewerID?.lastName}`}</Typography.Paragraph>
            <Rate allowHalf defaultValue={4} disabled />
            <Typography.Paragraph className="m-0 text-gray-500">{dayjs(review?.createdAt?.toString()).format('DD/MM/YYYY')}</Typography.Paragraph>
          </Flex>
          <Typography.Paragraph className="m-0 text-base">{review?.content}</Typography.Paragraph>
          {review?.image.map((src: string) => <Image alt="" src={src} fallback={defaultPic} width={'10%'} />)}
        </Flex>
        <Dropdown menu={{ items }} trigger={['click']}>
          <MoreOutlined className="text-gray-500" />
        </Dropdown>
      </Flex>
      <Divider />
    </div>
  );
};

export default ReviewItem;
