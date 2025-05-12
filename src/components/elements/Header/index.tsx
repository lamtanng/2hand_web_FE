import { Divider, Flex, Image } from 'antd';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import CustomCategoryMenu from '../Menu/CategoryMenu';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import UserInfoGroup from './components/UserInfoGroup';
import ActionGroup from './components/ActionGroup';
import logo from '../../../../public/logo.webp';
import { guestUrls } from '../../../constants/urlPaths/guestUrls';

export default function Header() {
  const { user } = useAppSelector(loginSelector);
  const displayingGroup = user.phoneNumber ? <UserInfoGroup user={user} /> : <ActionGroup />;

  return (
    <>
      <div className="nav-bar fixed z-20 mx-auto w-full bg-white py-5 shadow-sm">
        <Flex align="center" justify="space-between" className="mx-5 md:mx-10 xl:mx-auto xl:w-10/12">
          <Flex gap={'large'} justify="start" align="center" className="flex xl:flex-grow">
            <Flex gap="large" className="font-sans">
              <Link to="/" className="font-sans">
                <Image alt="" src={logo} width={50} preview={false} />
              </Link>
            </Flex>
            <Link to={'/'} className="font-sans text-base">
              Home
            </Link>
            <Link to={{ pathname: `/${guestUrls.productListUrl}`, search: 'page=1&limit=8' }} className="font-sans text-base">
              Products
            </Link>
          </Flex>
          {displayingGroup}
        </Flex>
        <Divider className="my-4" />
        <CustomCategoryMenu />
      </div>
    </>
  );
}
