import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Space } from 'antd';
import useCategoryMenu from './useCategoryMenu';
import { CategoryProps } from '../../../../types/category.type';
import { Link, useNavigate } from 'react-router-dom';
import { guestUrls } from '../../../../constants/urlPaths/guestUrls';

const CustomCategoryMenu = () => {
  const { category } = useCategoryMenu();
  const navigate = useNavigate();

  const topLevel = category.filter((cate: CategoryProps) => !cate.parentID);
  const getChildCate = (parentID: string) => {
    const childCate = category.filter((cate: CategoryProps) => cate.parentID?._id === parentID);
    return childCate.length !== 0 ? childCate : null;
  };

  const items: MenuProps['items'] = topLevel.map((cate: CategoryProps) => ({
    key: cate.slug,
    label: cate.name,
    children: getChildCate(cate._id)?.map((cate: CategoryProps) => ({
      key: cate.slug,
      label: cate.name,
      children: getChildCate(cate._id)?.map((cate: CategoryProps) => ({
        key: cate.slug,
        label: cate.name,
      })),
    })),
  }));

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    navigate(`${guestUrls.productListUrl}`);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="mx-auto w-10/12">
      <Flex justify='space-between'>
      <Dropdown menu={menuProps}>
        <Space>
          <MenuOutlined />
        </Space>
      </Dropdown>
        {topLevel.map((category: CategoryProps) => (
          <Link to={`/${guestUrls.productListUrl}`} className='font-sans text-black flex-shrink-0'>{category.name}</Link>
        ))}
      </Flex>
    </div>
  );
};

export default CustomCategoryMenu;
