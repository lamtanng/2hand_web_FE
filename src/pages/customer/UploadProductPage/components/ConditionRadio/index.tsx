import { Typography } from "antd";
import { ProductQuality } from "../../../../../types/enum/productQuality.enum";

const ConditionRadio = ({ selected, onChange }: { selected: any; onChange: any }) => {
  const conditions = [
    {
      value: ProductQuality.New,
      label: 'New',
      description: 'Item comes with tags, has not been opened from its box/package, and has not been used.',
      color: 'blue',
    },
    {
      value: ProductQuality.LikeNew,
      label: 'Like New',
      description: 'Item comes with tags, has been opened from its package/box, and has not been used.',
      color: 'gray',
    },
    {
      value: ProductQuality.Good,
      label: 'Good',
      description: 'Used, fully functional, and works well (may have some minor scratches).',
      color: 'gray',
    },
    {
      value: ProductQuality.Average,
      label: 'Average',
      description: 'Used item, fully functional, with several flaws or minor defects.',
      color: 'gray',
    },
    {
      value: ProductQuality.Old,
      label: 'Old',
      description: 'Used. Many flaws. May be damaged (details to be provided if damaged).',
      color: 'gray',
    },
  ];

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex items-center">
      <Typography.Paragraph className="m-0 mt-0.5 pb-2">Condition</Typography.Paragraph>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {conditions.map((condition) => (
          <label
            key={condition.value}
            className={`relative flex items-center cursor-pointer flex-col rounded-lg border-dashed border p-4 transition-all duration-200 ${
              selected === condition.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            } `}
          >
            <input
              type="radio"
              name="condition"
              value={condition.value}
              checked={selected === condition.value}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            <span
              className={`mb-2 text-base font-medium ${selected === condition.value ? 'text-blue-600' : 'text-gray-900'} `}
            >
              {condition.label}
            </span>
            <p className="text-sm leading-relaxed text-gray-500 text-center">{condition.description}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ConditionRadio;
