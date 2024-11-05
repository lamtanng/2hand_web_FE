import { Radio, Space } from 'antd';
import React from 'react';

const priceValue = [
  {
    label: 'All',
    range: undefined,
  },
  {
    label: 'Free',
    range: {
      min: 0,
      max: 0,
    },
  },
  {
    label: '0 VND - 1,000 VND',
    range: {
      min: 0,
      max: 1000,
    },
  },
  {
    label: '1,000 VND - 2,000 VND',
    range: {
      min: 1000,
      max: 2000,
    },
  },
  {
    label: '2,000 VND - 3,000 VND',
    range: {
      min: 2000,
      max: 3000,
    },
  },
];

const PriceFilter = ({
  setPage,
  setPrice,
}: {
  setPrice: React.Dispatch<
    React.SetStateAction<{
      min?: number;
      max?: number;
    }>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Radio.Group
      defaultValue={undefined}
      className="font-normal"
      onChange={(event) => {
        setPrice(event.target.value);
        setPage(1);
      }}
    >
      <Space direction="vertical">
        {priceValue.map((price: any) => (
          <Radio key={price.label} value={JSON.stringify(price.range)}>{price.label}</Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default PriceFilter;
