import { FlagOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Image, InputNumber, Typography } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';
import ImageSlider from '../ImageSlider';
import { Link } from 'react-router-dom';

const ProductInfo = () => {
  return (
    <div id="product" className="my-5 rounded-xl bg-white p-8 shadow-sm">
      <Flex className="gap-16">
        <div className="w-5/12">
          <Flex vertical gap={'large'}>
            <div className="relative">
              <Image width={'100%'} src="error" fallback={defaultPic} />
              {/* {
                      <div className="absolute left-[198px] top-[198px] z-10 rounded-full bg-black bg-opacity-65 px-7 py-16 text-2xl font-sans font-semibold text-white">
                        Sold Out
                      </div>
                    } */}
            </div>
            <ImageSlider />
            <Flex justify="space-between" align="baseline" className="font-sans text-xs text-gray-500">
              <div>
                You have similar products? <Link to={'#'}>Sell now</Link>
              </div>
              <Flex gap={'small'}>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <FlagOutlined /> Report
                </Button>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <ShareAltOutlined /> Share
                </Button>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <HeartOutlined /> Like
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <div className="w-7/12">
          <Flex vertical gap={'large'}>
            <Typography.Title level={3} className="m-0 font-semibold">
              Name
            </Typography.Title>
            <Typography.Title level={3} className="m-0 font-bold text-blue-600">
              Price
            </Typography.Title>
            <Flex vertical gap={'large'} className="mx-6">
              <Flex align="baseline" gap={'small'}>
                <Typography.Paragraph className="m-0 w-1/6">Deliver to: </Typography.Paragraph>
                <Typography.Paragraph className="m-0 w-5/6">
                  From Location to{' '}
                  <Button type="link" className="m-0 p-0">
                    Address
                  </Button>
                </Typography.Paragraph>
              </Flex>
              <Flex align="baseline" gap={'small'}>
                <Typography.Paragraph className="m-0 w-1/6">Quantity: </Typography.Paragraph>
                <InputNumber min={1} max={10} defaultValue={1} />
                <Typography.Paragraph className="m-0 ml-6 text-gray-500">Number items in stock</Typography.Paragraph>
              </Flex>
            </Flex>
            <Flex gap={'large'}>
              <Button color="primary" variant="outlined" className="w-1/2 py-5 font-bold">
                Add to cart
              </Button>
              <Button type="primary" className="w-1/2 py-5 font-bold">
                Buy now
              </Button>
            </Flex>
            <Divider />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default ProductInfo;
