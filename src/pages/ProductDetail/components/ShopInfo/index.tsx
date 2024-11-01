import { MessageOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Flex, Row, Typography } from 'antd';

const ShopInfo = () => {
  return (
    <div id="shop" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
      <Typography.Title level={4} className="m-0 mb-8">
        Seller's Information
      </Typography.Title>
      <Flex gap={'large'} align="center">
        <div className="inline w-1/3">
          <Flex gap={'middle'} align="center">
            <Avatar size={75} icon={<UserOutlined />} />
            <Flex gap={'middle'} vertical className="flex-grow">
              <Typography.Title level={5} className="m-0">
                Shop name
              </Typography.Title>
              <Flex gap={'small'}>
                <Button variant="filled" color="primary" className="w-1/2">
                  <MessageOutlined /> Chat now
                </Button>
                <Button variant="outlined" color="primary" className="w-1/2">
                  <ShopOutlined /> Visit shop
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <Divider type="vertical" className="h-20" />
        <div className="inline w-2/3">
          <Row gutter={[24, 0]}>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Reviews</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Joined in</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Followers</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Products</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Response rate</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex justify="space-between">
                <p>Response time</p>
                <p className="text-blue-600">0</p>
              </Flex>
            </Col>
          </Row>
        </div>
      </Flex>
    </div>
  );
};

export default ShopInfo;
