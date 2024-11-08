import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../../../constants/apiPaths/authPaths';
import { customerUrls } from '../../../../../constants/urlPaths/customer/customerUrls';

const ActionGroup = () => {
  return (
    <Flex gap={'middle'} justify="center" align="center">
      <Link to={`/${authPaths.signupPath}`} className="font-sans">
        Sign Up
      </Link>
      <Link to={`/${authPaths.loginPath}`} className="font-sans">
        Sign In
      </Link>
      <Link to={`/${customerUrls.storeRegisterUrl}`}>
        <Button type="primary" className="hidden px-10 text-base md:inline">
          Sell a product
        </Button>
      </Link>
    </Flex>
  );
};

export default ActionGroup;
