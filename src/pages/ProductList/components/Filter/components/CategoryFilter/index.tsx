import { Button, Checkbox, Flex } from 'antd';
import { CategoryProps } from '../../../../../../types/category.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const CategoryFilter = ({
  category,
  selectedCategory,
  setSelectedCategory,
  setPage
}: {
  category: CategoryProps[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory: string[];
}) => {
  const handleCheckbox = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory((prevData) => {
        return prevData.filter((key) => {
          return key !== value;
        });
      });
    }
    setPage(1);
  };

  return (
    <>
      <Flex vertical className="font-normal">
        {category.filter((cate: CategoryProps) => cate.childrenIDs?.length === 0).map((cate: CategoryProps) => (
          <Checkbox value={cate._id} onChange={handleCheckbox} checked={selectedCategory.includes(cate._id)}>
            {cate.name}
          </Checkbox>
        ))}
      </Flex>
      <Button
        variant="link"
        color="primary"
        className="mt-4"
        onClick={() => {
          setSelectedCategory([]);
          setPage(1);
        }}
      >
        Clear
      </Button>
    </>
  );
};

export default CategoryFilter;
