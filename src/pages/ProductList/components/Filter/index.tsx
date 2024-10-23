import { Checkbox, Collapse, CollapseProps, Flex, Radio, Space } from 'antd';
import { Link } from 'react-router-dom';

const cate = (
  <Flex vertical>
    <Link to={'#'} className="font-normal text-black hover:text-blue-400 active:font-semibold active:text-blue-700">
      All Cate
    </Link>
    <Link
      to={'#'}
      className="font-normal text-black hover:text-blue-600 active:font-semibold active:text-blue-700"
      style={{ paddingInlineStart: 24 }}
    >
      Cate 1
    </Link>
    <Link
      to={'#'}
      className="font-normal text-black hover:text-blue-600 active:font-semibold active:text-blue-700"
      style={{ paddingInlineStart: 24 }}
    >
      Cate 2
    </Link>
    <Link
      to={'#'}
      className="font-normal text-black hover:text-blue-600 active:font-semibold active:text-blue-700"
      style={{ paddingInlineStart: 24 }}
    >
      Cate 3
    </Link>
  </Flex>
);

const price = (
  <Radio.Group className="font-normal">
    <Space direction="vertical">
      <Radio value={1}>Option A</Radio>
      <Radio value={2}>Option B</Radio>
      <Radio value={3}>Option C</Radio>
    </Space>
  </Radio.Group>
);

const location = (
  <Radio.Group className="font-normal">
    <Space direction="vertical">
      <Radio value={1}>Option A</Radio>
      <Radio value={2}>Option B</Radio>
      <Radio value={3}>Option C</Radio>
    </Space>
  </Radio.Group>
);

const quality = (
  <Flex vertical className="font-normal">
    <Checkbox>New</Checkbox>
    <Checkbox>Good</Checkbox>
    <Checkbox>Old</Checkbox>
  </Flex>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Category',
    children: cate,
  },
  {
    key: '2',
    label: 'Price',
    children: price,
  },
  {
    key: '3',
    label: 'Location',
    children: location,
  },
  {
    key: '4',
    label: 'Quality',
    children: quality,
  },
];

const Filter = () => {
  return (
    <Collapse items={items} bordered={false} ghost className="font-bold" defaultActiveKey={['1', '2', '3', '4']} />
  );
};

export default Filter;
