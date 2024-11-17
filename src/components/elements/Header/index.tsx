import { Flex } from 'antd';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import CustomCategoryMenu from '../Menu/CategoryMenu';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import UserInfoGroup from './components/UserInfoGroup';
import ActionGroup from './components/ActionGroup';

export default function Header() {
  const { user } = useAppSelector(loginSelector);
  const displayingGroup = user.email ? <UserInfoGroup user={user} /> : <ActionGroup />;

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
            <Search
              placeholder="input search text"
              allowClear
              className="hidden w-full text-base md:inline xl:min-w-80 xl:max-w-80"
            />
          </Flex>
          {displayingGroup}
        </Flex>
      </div>
    </>
  );
}
