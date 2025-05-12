import { Button, Checkbox, Flex } from 'antd';
import { ProductQuality } from '../../../../../../types/enum/productQuality.enum';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { guestUrls } from '../../../../../../constants/urlPaths/guestUrls';
import { useState } from 'react';

interface QualityProps {
  label: string;
  value: string;
}

const qualityValue: QualityProps[] = [
  {
    label: 'New',
    value: ProductQuality.New,
  },
  {
    label: 'Like new',
    value: ProductQuality.LikeNew,
  },
  {
    label: 'Good',
    value: ProductQuality.Good,
  },
  {
    label: 'Average',
    value: ProductQuality.Average,
  },
  {
    label: 'Old',
    value: ProductQuality.Old,
  },
];

const QualityFilter = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [quality, setQuality] = useState<string[]>(Array(searchParams.get('quality') ?? ''));

  const handleCheckbox = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;
    let qualityFilter;

    if (isSelected) {
      qualityFilter = [...quality, value];
    } else {
      qualityFilter = quality.filter((key) => key !== value);
    }
    setQuality(qualityFilter);
    searchParams.set('page', '1');
    if (qualityFilter.length !== 0) {
      searchParams.set('quality', JSON.stringify(qualityFilter));
    } else {
      searchParams.delete('quality');
    }
    navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
  };
  return (
    <>
      <Flex vertical className="font-normal">
        {qualityValue.map((qual: QualityProps) => (
          <Checkbox value={qual.value} onChange={handleCheckbox} checked={quality.includes(qual.value)}>
            {qual.label}
          </Checkbox>
        ))}
      </Flex>
      <Button
        variant="link"
        color="primary"
        className="mt-4"
        onClick={() => {
          setQuality([]);
          searchParams.set('page', '1');
          searchParams.delete('quality');
          navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
        }}
      >
        Clear
      </Button>
    </>
  );
};

export default QualityFilter;
