import { Button, Flex } from 'antd';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { authPaths } from '../../../constants/apiPaths/authPaths';
import CustomCategoryMenu from '../Menu/CategoryMenu';

export default function Header() {
  return (
    <>
      <div className="nav-bar fixed z-20 mx-auto w-full bg-white py-3 shadow-sm">
        <Flex align="center" justify="space-between" className="mx-5 md:mx-10 xl:mx-auto xl:w-10/12">
          <Flex gap={'large'} justify="start" align="center" className="flex xl:flex-grow">
            <Flex gap="large" className="font-sans">
              <Link to="/" className="font-sans">
                LOGO
              </Link>
              <CustomCategoryMenu />
            </Flex>
            <Search placeholder="input search text" allowClear className="hidden md:inline w-full xl:min-w-80 xl:max-w-screen-sm text-base" />
          </Flex>
          <Flex gap={'middle'} justify="center" align="center">
            <Link to={authPaths.signupPath} className="font-sans">
              Sign Up
            </Link>
            <Link to={authPaths.loginPath} className="font-sans">
              Sign In
            </Link>
            <Button type="primary" className="hidden md:inline h-10 text-base">
              Sell a product
            </Button>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
