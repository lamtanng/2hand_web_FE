import { CustomFormItemProps } from '../../../../types/input.type';
import { Flex, Form, Input, Typography } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

export default function CustomFormItem({
  name,
  hint,
  type = 'text',
  label = '',
  isRequired = false,
  isDisabled = false,
}: CustomFormItemProps) {
  const { control } = useFormContext();
  const InputComponent = type === 'password' ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          rules={[{ required: isRequired }]}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
          className="w-full text-base"
        >
          <Flex gap={'small'} className='mb-[10px]'>
            <Typography.Paragraph className='m-0'>{label}</Typography.Paragraph>
            <Typography.Paragraph className='m-0 text-red-600'>*</Typography.Paragraph>
          </Flex>
          <InputComponent
            className="inputs h-10 w-full text-base"
            disabled={isDisabled}
            placeholder={hint}
            {...field}
          />
        </Form.Item>
      )}
    />
  );
}
