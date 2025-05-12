import { Radio, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { guestUrls } from '../../../../../../constants/urlPaths/guestUrls';

interface PriceProps {
  label: string;
  range?: {
    min?: number;
    max?: number;
  };
}

const priceValue: PriceProps[] = [
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

const PriceFilter = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  return (
    <Radio.Group
      defaultValue={undefined}
      className="font-normal"
      onChange={(event) => {
        searchParams.set('page', '1');
        if (event.target.value) {
          searchParams.set('price', event.target.value);
        } else {
          searchParams.delete('price');
        }
        navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
      }}
    >
      <Space direction="vertical">
        {priceValue.map((price: PriceProps) => (
          <Radio key={price.label} value={JSON.stringify(price.range)}>
            {price.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default PriceFilter;
