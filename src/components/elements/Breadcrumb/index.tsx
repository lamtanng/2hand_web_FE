import { Breadcrumb } from 'antd';

const items = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/product-list',
  },
];

const CustomBreadcrumb = () => {
  return <Breadcrumb separator=">" items={items} />;
};

export default CustomBreadcrumb;
