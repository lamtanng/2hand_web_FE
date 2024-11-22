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
    label: '0 VND - 50,000 VND',
    range: {
      min: 0,
      max: 50000,
    },
  },
  {
    label: '50,000 VND - 100,000 VND',
    range: {
      min: 50000,
      max: 100000,
    },
  },
  {
    label: '100,000 VND - 200,000 VND',
    range: {
      min: 100000,
      max: 200000,
    },
  },
  {
    label: '200,000 VND - 500,000 VND',
    range: {
      min: 200000,
      max: 500000,
    },
  },
  {
    label: 'Over 500,000 VND',
    range: {
      min: 500000,
    },
  },
];

const PriceFilter = ({
  setPage,
  setPrice,
}: {
  setPrice: React.Dispatch<React.SetStateAction<string>>;
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
          <Radio key={price.label} value={JSON.stringify(price.range)}>
            {price.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default PriceFilter;
