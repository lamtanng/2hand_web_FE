import { Collapse, CollapseProps } from 'antd';
import { CategoryProps } from '../../../../types/category.type';
import PriceFilter from './components/PriceFilter';
import QualityFilter from './components/QualityFilter';
import CategoryFilter from './components/CategoryFilter';

const Filter = ({
  category
}: {
  category: CategoryProps[];
}) => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Category',
      children: <CategoryFilter category={category} />,
    },
    {
      key: '2',
      label: 'Price',
      children: <PriceFilter />,
    },
    {
      key: '3',
      label: 'Quality',
      children: <QualityFilter />,
    },
  ];
  return (
    <Collapse items={items} bordered={false} ghost className="font-bold" defaultActiveKey={['1', '2', '3', '4']} />
  );
};

export default Filter;
