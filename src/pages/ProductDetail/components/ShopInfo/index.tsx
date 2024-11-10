import { PhoneOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ProductProps } from '../../../../types/product.type';

const ShopInfo = ({ product, storeProduct }: {product: ProductProps | undefined, storeProduct: ProductProps[]}) => {
  const encodedID = product && product.storeID.userID._id && btoa(product.storeID.userID._id);
  const dateString =
    product && product.storeID.userID.createdAt && new Date(product.storeID.userID.createdAt).toDateString();
  return (
    <div id="shop" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
      <Typography.Title level={4} className="m-0 mb-8">
        Seller's Information
      </Typography.Title>
      <Flex gap={'large'} align="center">
        <div className="inline w-2/5">
          <Flex gap={'middle'} align="center">
            <Avatar size={75} icon={<UserOutlined />} />
            <Flex gap={'middle'} vertical className="flex-grow">
              <Typography.Title level={5} className="m-0">
                {product?.storeID.userID.firstName && product?.storeID.userID.lastName
                  ? `${product?.storeID.userID.firstName} ${product?.storeID.userID.lastName}`
                  : product?.storeID.userID.email}
              </Typography.Title>
              <Flex gap={'small'}>
                <Button variant="filled" color="primary" className="w-1/2">
                  <PhoneOutlined /> {product?.storeID.userID.phoneNumber}
                </Button>
                <Link to={`/user/${encodedID}`} className="w-1/2">
                  <Button variant="outlined" color="primary" className="w-full">
                    <ShopOutlined /> Visit shop
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <Divider type="vertical" className="h-20" />
        <div className="inline w-3/5">
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Flex justify="space-between">
                <p>Store name</p>
                <p className="text-blue-600">{product?.storeID.name}</p>
              </Flex>
            </Col>
            <Col span={12}>
              <Flex justify="space-between">
                <p>Joined in</p>
                <p className="text-blue-600">{dateString}</p>
              </Flex>
            </Col>
            <Col span={12}>
              <Flex justify="space-between">
                <p>Followers</p>
                <p className="text-blue-600">{product?.storeID.userID.followerID?.length}</p>
              </Flex>
            </Col>
            <Col span={12}>
              <Flex justify="space-between">
                <p>Products</p>
                <p className="text-blue-600">{storeProduct.length}</p>
              </Flex>
            </Col>
          </Row>
        </div>
      </Flex>
    </div>
  );
};

export default ShopInfo;
