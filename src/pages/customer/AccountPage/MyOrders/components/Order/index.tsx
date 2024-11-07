import { Button, Divider, Flex, Typography, Image } from 'antd';
import defaultImg from '../../../../../../assets/blob.jpg';
import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Order = () => {
  return (
    <div className='mb-6'>
      <div id="order" className="rounded-md bg-slate-50 p-6">
        <div id="order-summary">
          <Flex justify="space-between">
            <Flex id="shop-info" align="center" gap={'small'} className="w-1/3">
              <ShopOutlined />
              <Typography.Title level={5} className="m-0 inline truncate">
                Shop nameShop name
              </Typography.Title>
              <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button>
              <Button variant="outlined" className="px-2 py-1 text-xs">
                <ShopOutlined /> Visit shop
              </Button>
            </Flex>
            <div id="order-status">
              <p className="m-0 font-sans text-blue-700">STATUS</p>
            </div>
          </Flex>
        </div>
        <Divider />
        <Link to={'id'}>
          <div id="order-detail">
            <Flex justify="space-between" align="center">
              <div id="product-info">
                <Flex gap={'middle'}>
                  <Image width={75} preview={false} alt="" src="" fallback={defaultImg} />
                  <div>
                    <Typography.Title level={5} className="m-0">
                      Product name
                    </Typography.Title>
                    <Typography.Paragraph className="text-xs">quantity</Typography.Paragraph>
                  </div>
                </Flex>
              </div>
              <div id="prodct-price" className="font-sans">
                0 VND
              </div>
            </Flex>
          </div>
        </Link>
        <Divider />
        <div id="total-price">
          <Flex justify="end" align="center" gap={'middle'}>
            <p className="m-0 font-sans">Total price:</p>
            <p className="m-0 font-sans text-xl text-blue-700">0 VND</p>
          </Flex>
        </div>
        <div id="actions" className="mt-6">
          <Flex justify="end" gap={'middle'}>
            <Button type="primary" className="h-10 text-base">
              Rebuy
            </Button>
            <Button variant="outlined" className="h-10 text-base">
              Contact shop
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Order;
