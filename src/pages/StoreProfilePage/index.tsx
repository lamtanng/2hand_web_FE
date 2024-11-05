import { Avatar, Button, Flex, Rate, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import { UserOutlined } from '@ant-design/icons';
import ProductList from '../../components/elements/Lists/ProductList';
import ReviewList from './components/ReviewList';

const StoreProfilePage = () => {
  return (
    <>
      <Header />
      <div className="-m-5 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div className="mb-6 rounded-xl bg-white px-24 py-8 shadow-sm">
            <Flex gap={100} align="center">
              <Avatar size={150} icon={<UserOutlined />} />
              <div id="store-info" className="grid grid-cols-2 gap-6">
                <Typography.Paragraph className="m-0 text-base">Store ID: ID</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Store name: Name</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">
                  Rate:
                  <Rate allowHalf defaultValue={4} disabled className="m-0" />
                </Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Products: 0</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Orders: 0</Typography.Paragraph>
              </div>
            </Flex>
          </div>
          <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={3} className="m-0 mb-6">
              About Store
            </Typography.Title>
            <Typography.Paragraph className="m-0 text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis animi, nostrum beatae, officiis incidunt,
              tempora soluta aut temporibus assumenda dolores sapiente! Architecto, eum autem voluptatum doloremque
              nulla odit? Minus, pariatur. Fugit perferendis dicta nihil est, illo suscipit. Mollitia corporis ut
              veritatis magnam harum voluptatibus quibusdam facilis commodi sint sit enim ipsam nihil, blanditiis dicta
              non praesentium nesciunt! Quod, tenetur consectetur? Excepturi rem exercitationem, labore corrupti omnis
              cum dolore, hic nisi optio sed esse quibusdam ea repellendus ipsam, illum non tenetur laudantium tempore
              minima. Voluptatibus nulla necessitatibus corporis eaque voluptatem maxime.
            </Typography.Paragraph>
          </div>
          <div className="mb-6 p-8">
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
          <ReviewList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoreProfilePage;
