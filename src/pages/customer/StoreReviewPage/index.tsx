import { UserOutlined } from '@ant-design/icons';
import { Divider, Flex, Typography, Image, Button, Avatar, Rate, TabsProps, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import defaultPic from '../../../assets/blob.webp';

const onChange = (key: string) => {
  console.log(key);
};

const waitingList = (
  <div id="order-list">
    <div id="order" className="mb-6 rounded-md bg-slate-50 p-6">
      <Flex id="order-summary" gap={'small'} align="center">
        <Avatar size={'large'} icon={<UserOutlined />} className="w-1/10" />
        <Typography.Title level={5} className="m-0 inline w-1/3 truncate">
          Customer name Customer name
        </Typography.Title>
      </Flex>
      <Divider />
      <Link to={'/account/orders/id'}>
        <div id="order-detail">
          <div id="product-info">
            <Flex gap={'middle'}>
              <Image width={75} preview={false} alt="" src="" fallback={defaultPic} />
              <div>
                <Typography.Title level={5} className="m-0">
                  Product name
                </Typography.Title>
                <Typography.Paragraph className="text-xs">quantity</Typography.Paragraph>
              </div>
            </Flex>
          </div>
        </div>
      </Link>
      <Divider />
      <div id="total-price"></div>
    </div>
  </div>
);

const reviewedList = (
  <div id="order-list">
    <div id="order" className="mb-6 rounded-md bg-slate-50 p-6">
      <Flex id="order-summary" gap={'small'} align="center">
        <Avatar size={'large'} icon={<UserOutlined />} className="w-1/10" />
        <Typography.Title level={5} className="m-0 inline w-1/3 truncate">
          Customer name Customer name
        </Typography.Title>
      </Flex>
      <Divider />
      <Link to={'/account/orders/id'}>
        <div id="order-detail">
          <div id="product-info">
            <Flex gap={'middle'}>
              <Image width={75} preview={false} alt="" src="" fallback={defaultPic} />
              <div>
                <Typography.Title level={5} className="m-0">
                  Product name
                </Typography.Title>
                <Typography.Paragraph className="text-xs">quantity</Typography.Paragraph>
              </div>
            </Flex>
          </div>
        </div>
      </Link>
      <Divider />
      <div id="total-price"></div>
      <div id="actions" className="mt-6">
        <Flex justify="end" align="center">
          <Button type="primary" className="px-10 py-5 text-base">
            Response
          </Button>
        </Flex>
      </div>
    </div>
  </div>
);

const responsedList = (
  <div id="reviewed-list">
    <div id="review">
      <Flex gap={'large'}>
        <Avatar size={'large'} icon={<UserOutlined />} className="w-1/10" />
        <Flex gap={'middle'} vertical className="w-full">
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">User's Name</Typography.Paragraph>
            <Rate allowHalf defaultValue={4} disabled />
            <Typography.Paragraph className="m-0 text-gray-500">Review Date</Typography.Paragraph>
          </Flex>
          <Typography.Paragraph className="m-0 text-base">Content</Typography.Paragraph>
          <Image alt="" src="" fallback={defaultPic} width={'10%'} />
          <Flex className="rounded-md bg-blue-50 p-6" vertical gap={'small'}>
            <Typography.Paragraph className="m-0 text-base font-semibold">Response from seller:</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam vitae animi, dolorem non nam soluta quo!
              Pariatur aspernatur libero architecto magni corporis non, beatae voluptas veritatis, dolorum cum ipsum
              totam? Vitae consectetur sit repellat, at est totam eius accusamus voluptates, incidunt natus, tenetur
              voluptatibus nostrum debitis necessitatibus in nobis id! Omnis minima similique numquam, non optio commodi
              ab adipisci nam. Autem exercitationem quia velit dolorum necessitatibus quas libero porro quae numquam,
              sapiente accusantium eum illo molestiae! Adipisci eveniet laborum pariatur? Nihil deleniti odio voluptate
              aut doloremque? Amet nulla itaque quis.
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </div>
  </div>
);

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Waiting for review',
    children: waitingList,
  },
  {
    key: '2',
    label: 'Reviewed Orders',
    children: reviewedList,
  },
  {
    key: '3',
    label: 'Responsed reviews',
    children: responsedList,
  },
];

const StoreReview = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default StoreReview;
