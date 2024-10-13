import { DatePicker, Form } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomDatePickerProps } from '../../../../types/input.type';

const CustomDatePicker = ({
    name,
    label = "",
  }: CustomDatePickerProps) => {
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
            <DatePicker className='w-full text-base h-10' allowClear={false} {...field} />
        </Form.Item>
      )}
    />
  );
};

export default CustomDatePicker;
