import { Button, Checkbox, Flex } from 'antd';

const qualityValue = [
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Good',
    value: 'good',
  },
  {
    label: 'Old',
    value: 'old',
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
  const handleCheckbox = (event: any) => {
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
        {qualityValue.map((qual: any) => (
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
