import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CategoryProps } from '../../../../../../types/category.type';

const CategoryDropdown = ({
  category,
  selectedCategory,
  setSelectedCategory,
}: {
  category: CategoryProps[];
  selectedCategory: CategoryProps | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryProps | undefined>>;
}) => {
  const topLevel = category.filter((cate: CategoryProps) => !cate.parentID);
  const getChildCate = (parentID: string) => {
    const childCate = category.filter((cate: CategoryProps) => cate.parentID?._id === parentID);
    return childCate.length !== 0 ? childCate : null;
  };

  const items: MenuProps['items'] = topLevel.map((cate: CategoryProps) => ({
    key: JSON.stringify(cate),
    label: cate.name,
    children: getChildCate(cate._id)?.map((cate: CategoryProps) => ({
      key: JSON.stringify(cate),
      label: cate.name,
      children: getChildCate(cate._id)?.map((cate: CategoryProps) => ({
        key: JSON.stringify(cate),
        label: cate.name,
      })),
    })),
  }));

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedCategory(JSON.parse(e.key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true
  };
  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button className="h-10 w-full">
        <Flex justify="space-between" className="w-full">
          <Typography.Paragraph className="m-0 truncate">
            {selectedCategory ? selectedCategory.name : 'Select Category'}
          </Typography.Paragraph>
          <DownOutlined />
        </Flex>
      </Button>
    </Dropdown>
  );
};

export default CategoryDropdown;
