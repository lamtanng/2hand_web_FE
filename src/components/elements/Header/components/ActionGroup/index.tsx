import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../../../constants/apiPaths/authPaths';

const ActionGroup = () => {
  return (
    <Flex gap={'middle'} justify="center" align="center">
      <Link to={`/${authPaths.signupPath}`} className="font-sans">
        <Button variant="outlined">Sign Up</Button>
      </Link>
      <Link to={`/${authPaths.loginPath}`} className="font-sans">
        <Button type='primary'>Sign In</Button>
      </Link>
    </Flex>
  );
};

export default ActionGroup;
