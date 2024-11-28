import { Button, Flex, Typography } from 'antd';
import Footer from '../../../components/elements/Footer';
import Header from '../../../components/elements/Header';
import ProductList from '../../../components/elements/Lists/ProductList';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';

const OrderIntermediaryPage = () => {
  return (
    <>
      <Header />
      <div className="mt-14 h-fit min-h-screen w-full bg-slate-50">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <div className="mb-6 rounded-xl bg-white py-14 shadow-sm">
            <Flex vertical gap={'large'} justify="center" align="center">
              <Typography.Title level={2} className="m-0 rounded-full text-8xl text-blue-600">
                <CheckCircleTwoTone />
              </Typography.Title>
              <Typography.Title level={5} className="m-0 text-blue-600">
                Your orders have been placed successfully. Now you can:
              </Typography.Title>
              <Flex gap={'large'}>
                <Link to={'/'}>
                  <Button variant="outlined" className="h-10 text-base">
                    Return Home
                  </Button>
                </Link>
                <Link to={`/${accountUrls.accountUrl}/${accountUrls.puchasesUrl}`}>
                  <Button type="primary" className="h-10 text-base">
                    Access Your Orders
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </div>
          <div>
            <Typography.Title level={3} className="m-0 text-blue-600">
              More Products
            </Typography.Title>
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderIntermediaryPage;
