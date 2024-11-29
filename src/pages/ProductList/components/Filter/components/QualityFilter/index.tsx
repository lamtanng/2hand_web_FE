import { Button, Checkbox, Flex } from 'antd';
import { ProductQuality } from '../../../../../../types/enum/productQuality.enum';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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

const QualityFilter = ({
  quality,
  setQuality,
  setPage,
}: {
  setQuality: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  quality: string[];
}) => {
  const handleCheckbox = (event: CheckboxChangeEvent) => {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setQuality([...quality, value]);
    } else {
      setQuality((prevData) => {
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
          setPage(1);
        }}
      >
        Clear
      </Button>
    </>
  );
};

export default QualityFilter;
