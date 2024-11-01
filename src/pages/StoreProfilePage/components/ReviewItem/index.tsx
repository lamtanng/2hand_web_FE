import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Typography, Image, Dropdown, MenuProps, Divider, Rate } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';

const items: MenuProps['items'] = [
  {
    label: <a href="#">Report</a>,
    key: '0',
  },
];

const ReviewItem = () => {
  return (
    <div id="review-item">
      <Flex gap={'large'} align="start">
        <Avatar size={'large'} icon={<UserOutlined />} />
        <Flex gap={'middle'} className="flex-grow" vertical>
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">User's Name</Typography.Paragraph>
            <Rate allowHalf defaultValue={4} disabled />
            <Typography.Paragraph className="m-0 text-gray-500">Review Date</Typography.Paragraph>
          </Flex>
          <Typography.Paragraph className="m-0 text-base">Content</Typography.Paragraph>
          <Image alt="" src="" fallback={defaultPic} width={'10%'} />
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
