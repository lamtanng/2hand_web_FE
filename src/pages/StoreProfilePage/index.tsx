import { Avatar, Button, Flex, Pagination, Rate, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import { UserOutlined } from '@ant-design/icons';
import ProductList from '../../components/elements/Lists/ProductList';
import ReviewItem from './components/ReviewItem';

const StoreProfilePage = () => {
  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div className="mb-5 rounded-xl bg-white px-24 py-8 shadow-sm">
            <Flex gap={100}>
              <Avatar size={150} icon={<UserOutlined />} />
              <Flex id="store-info" vertical gap={'small'}>
                <Typography.Paragraph className="m-0 text-base">Shop ID:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Shop name:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Rate:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Products:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Orders:</Typography.Paragraph>
              </Flex>
            </Flex>
          </div>
          <div className="mb-5 p-8">
            <Flex align="baseline" gap={'large'}>
              <Typography.Title level={3} className="m-0">
                Posted Products
              </Typography.Title>
              <Button variant="link" color="primary" className="p-0">
                View all products
              </Button>
            </Flex>
            <ProductList />
          </div>
          <div className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={3} className="m-0 mb-6">
              All Reviews
            </Typography.Title>
            <div className="mb-6 rounded-md bg-blue-50 p-6">
              <Flex gap={'middle'} className="mb-4">
                <Rate />
                <Typography.Paragraph className="m-0">(0/5)</Typography.Paragraph>
                <Typography.Paragraph className="m-0">(number reviews)</Typography.Paragraph>
              </Flex>
              <Flex gap={'middle'}>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  All
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  5 stars (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  4 stars (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  3 stars (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  2 stars (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  1 stars (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  Has content (0)
                </Button>
                <Button variant="outlined" color="primary" className="px-5 py-3">
                  Has images/videos (0)
                </Button>
              </Flex>
            </div>
            <div id="review list">
              <ReviewItem />
            </div>
            <Pagination align="center" defaultCurrent={1} total={10} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoreProfilePage;
