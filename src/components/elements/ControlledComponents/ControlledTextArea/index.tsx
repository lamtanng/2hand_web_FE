import { CustomFormItemProps } from '../../../../types/input.type';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, useFormContext } from 'react-hook-form';

export default function CustomTextArea({
  name,
  hint,
  label = '',
  isRequired = false,
  isDisabled = false,
}: CustomFormItemProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          rules={[{ required: isRequired }]}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
          className="text-base"
        >
          <TextArea
            placeholder={hint}
            autoSize={{ minRows: 3 }}
            disabled={isDisabled}
            className='text-base'
            {...field}
          />
        </Form.Item>
      )}
    />
  );
}
