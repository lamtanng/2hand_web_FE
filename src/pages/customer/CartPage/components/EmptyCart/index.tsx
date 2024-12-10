import { Button, Flex, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { guestUrls } from '../../../../../constants/urlPaths/guestUrls';
import emptyCart from '../../../../../assets/emptyCart.png'

const EmptyCart = () => {
  return (
    <div className="mb-5 rounded-md bg-white p-8 shadow-sm">
      <Flex vertical justify="center" align="center">
        <Image alt="" src={emptyCart} width={'30%'} preview={false} />
        <Typography.Title level={5} className="m-0 mb-6 text-blue-600">
          Your cart is empty. Explore more products.
        </Typography.Title>
        <Link to={`/${guestUrls.productListUrl}`}>
          <Button type="primary" className="h-10">
            Go to Products Page
          </Button>
        </Link>
      </Flex>
    </div>
  );
};

export default EmptyCart;
