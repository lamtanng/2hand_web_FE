import { Form, Radio } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomRadioProps } from '../../../../types/input.type';

const CustomRadioButton = ({
    name,
    label = "",
    items,
  }: CustomRadioProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
          className="text-base"
        >
          <Radio.Group>
            {items.map((item: any) => (
                <Radio {...field}> {item.name} </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      )}
    />
  );
};

export default CustomRadioButton;
