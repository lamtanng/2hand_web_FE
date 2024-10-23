import { Avatar, Button, Col, Divider, Flex, Image, InputNumber, Row, Typography } from 'antd';
import CustomBreadcrumb from '../../components/elements/Breadcrumb';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import defaultPic from '../../assets/blob.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import {
  FlagOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ProductSlider from '../../components/elements/Slider/ProductSlider';
import ProductList from '../../components/elements/Lists/ProductList';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ProductDetail = () => {
  return (
    <>
      <Header />
      <div className="-m-5 bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <CustomBreadcrumb />
          <div id="product" className="my-5 rounded-xl bg-white p-8 shadow-sm">
            <Flex className="gap-16">
              <div className="w-5/12">
                <Flex vertical gap={'large'}>
                  <Image width={'100%'} src="error" fallback={defaultPic} />
                  <Carousel responsive={responsive}>
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                    <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
                  </Carousel>
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
                      <Typography.Paragraph className="m-0 ml-6 text-gray-500">
                        Number items in stock
                      </Typography.Paragraph>
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
          <div id="features" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={4} className="m-0 mb-8">
              Detailed Features
            </Typography.Title>
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Category</Typography.Paragraph>
              <CustomBreadcrumb />
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Stock</Typography.Paragraph>
              <Typography.Paragraph className="m-0">0</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Quality</Typography.Paragraph>
              <Typography.Paragraph className="m-0">Good</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Send from</Typography.Paragraph>
              <Typography.Paragraph className="m-0">Location</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
          </div>
          <div id="description" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={4} className="m-0 mb-8">
              Product's Description
            </Typography.Title>
            <Typography.Paragraph className="m-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum nesciunt minus voluptatem non quaerat
              vel necessitatibus corrupti excepturi ratione, laudantium exercitationem fuga quos tempore molestias.
              Praesentium laboriosam aperiam dolores cupiditate? Quos ratione iste at culpa accusantium repellendus
              odio, molestias amet delectus molestiae aperiam minima saepe, esse enim hic! Ullam ut iusto iste?
              Expedita, libero nesciunt. Nam voluptatibus sint quisquam aliquam! Distinctio, eos quisquam! Rem error
              voluptates aliquam ea quisquam ullam, laboriosam exercitationem odio facere hic iusto ipsam enim
              excepturi? Vero cupiditate placeat fuga libero alias nostrum totam enim praesentium ex.
            </Typography.Paragraph>
          </div>
          <div id="shop-products" className="mb-5 p-8">
            <Typography.Title level={4} className="m-0 mb-8">
              Other Products From Seller
            </Typography.Title>
            <ProductSlider />
          </div>
          <div id="recommend-products" className="mb-5 p-8">
            <Typography.Title level={4} className="m-0 mb-8">
              Recommend Products
            </Typography.Title>
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
