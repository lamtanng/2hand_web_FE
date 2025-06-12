import { Button, Checkbox, Flex } from 'antd';
import { CategoryProps } from '../../../../../../types/category.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { guestUrls } from '../../../../../../constants/urlPaths/guestUrls';
import { useState } from 'react';

const CategoryFilter = ({ category }: { category: CategoryProps[] }) => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string[]>(JSON.parse(searchParams.get('category') ?? '[]'));

  const handleCheckbox = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;
    let catergories;
    if (isSelected) {
      catergories = [...selectedCategory, value];
    } else {
      catergories = selectedCategory.filter((key) => key !== value);
    }
    setSelectedCategory(catergories);
    searchParams.set('page', '1');
    if (catergories.length !== 0) {
      searchParams.set('category', JSON.stringify(catergories));
    } else {
      searchParams.delete('category');
    }
    navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
  };

  return (
    <>
      <Flex vertical className="font-normal">
        {category
          .filter((cate: CategoryProps) => cate.childrenIDs?.length === 0)
          .map((cate: CategoryProps) => {
            const isSelected = selectedCategory.includes(cate._id);
            return (
              <Checkbox key={cate._id} value={cate._id} onChange={handleCheckbox} checked={isSelected}>
                {cate.name}
              </Checkbox>
            );
          })}
      </Flex>
      <Button
        variant="link"
        color="primary"
        className="mt-4"
        onClick={() => {
          setSelectedCategory([]);
          searchParams.delete('category');
          searchParams.set('page', '1');
          navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
        }}
      >
        Clear
      </Button>
    </>
  );
};

export default CategoryFilter;
