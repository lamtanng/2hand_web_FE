import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Typography } from 'antd';
import defaultPic from '../../../../../assets/blob.webp';

const WishlistItem = () => {
  return (
    <Flex justify="space-between" gap={'large'}>
      <Image src={defaultPic} width={'10%'} />
      <Flex className="flex-grow" vertical justify="space-between">
        <Typography.Link className="text-base">Product Name</Typography.Link>
        <Flex gap={'middle'}>
          <Button variant="outlined">
            <ShoppingCartOutlined />
          </Button>
          <Button type="primary">Buy Now</Button>
        </Flex>
      </Flex>
      <HeartFilled className="text-xl text-blue-600" />
    </Flex>
  );
};

export default WishlistItem;
