import { CustomFormItemProps } from '../../../../types/input.type';
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomFormItem({
  name,
  hint,
  type = "text",
  label = "",
  isRequired = false,
  isDisabled = false,
}: CustomFormItemProps) {
  const { control } = useFormContext();
  const InputComponent = type === "password" ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          rules={[{ required: isRequired}]}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
          className='text-base w-full'
        >
          <InputComponent className="inputs w-full text-base h-10" disabled={isDisabled} placeholder={hint} {...field} />
        </Form.Item>
      )}
    />
  );
}