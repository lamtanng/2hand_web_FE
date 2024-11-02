import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../../../constants/apiPaths/authPaths';

const ActionGroup = () => {
  return (
    <Flex gap={'middle'} justify="center" align="center">
      <Link to={`/${authPaths.signupPath}`} className="font-sans">
        Sign Up
      </Link>
      <Link to={`/${authPaths.loginPath}`} className="font-sans">
        Sign In
      </Link>
      <Button type="primary" className="hidden px-10 text-base md:inline" href='store-register'>
        Sell a product
      </Button>
    </Flex>
  );
};

export default ActionGroup;
