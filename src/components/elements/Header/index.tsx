import { Button, Flex } from 'antd';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../constants/apiPaths/authPaths';

export default function Header() {
  return (
    <div className="nav-bar fixed z-10 mx-auto w-full py-5 bg-white shadow-sm">
      <Flex align="center" justify="space-between" className="mx-auto w-10/12">
        <Flex gap={'middle'} justify="start" align="center" className="flex flex-grow">
          <Flex gap="small" className="font-sans">
            <Link to="/" className='font-sans'>LOGO</Link>
          </Flex>
          <Search placeholder="input search text" allowClear className="w-1/2 text-base" />
        </Flex>
        <Flex gap={'middle'} justify="center" align="center">
          <Link to={`/${authPaths.signupPath}`} className="font-sans">
            Sign Up
          </Link>
          <Link to={`/${authPaths.loginPath}`} className="font-sans">
            Sign In
          </Link>
          <Button type="primary" className='text-base h-10'>Sell a product</Button>
        </Flex>
      </Flex>
    </div>
  );
}
