import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { CategoryProps } from '../../../../../../../types/category.type';
import { DownOutlined } from '@ant-design/icons';

const CategoryDropdown = ({
  category,
  selectedCategory,
  setSelectedCategory,
}: {
  category: CategoryProps[];
  selectedCategory: CategoryProps | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryProps | undefined>>;
}) => {
  const items: MenuProps['items'] = category
    .filter((item: CategoryProps) => !item.parentID)
    .map((item: CategoryProps) => {
      return {
        label: item.name,
        key: JSON.stringify(item),
      };
    });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedCategory(JSON.parse(e.key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button className="h-10 w-full">
        <Flex justify="space-between" className="w-full">
          <Typography.Paragraph className="m-0 truncate">
            {selectedCategory ? selectedCategory.name : 'Select'}
          </Typography.Paragraph>
          <DownOutlined />
        </Flex>
      </Button>
    </Dropdown>
  );
};

export default CategoryDropdown;
