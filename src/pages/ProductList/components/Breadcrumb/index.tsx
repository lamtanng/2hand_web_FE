import { Breadcrumb } from 'antd';

const items = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '#',
  },
];

const CustomBreadcrumb = () => {
  return <Breadcrumb className="mb-5" separator=">" items={items} />;
};

export default CustomBreadcrumb;
