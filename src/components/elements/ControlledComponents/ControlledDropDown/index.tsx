import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Form, Typography } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

export default function ControlledDropDown({
  name,
  label = '',
  items,
  data,
}: {
  name: string;
  label: string;
  items: (data: any[], onClick: any) => JSX.Element;
  data: any;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value: onChange }, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
          className="text-base"
        >
          <Dropdown overlay={items(data, onChange)} trigger={['click']} placement="bottom">
            <Button className="w-full">
              <Flex justify="space-between" className="w-full">
                <Typography.Paragraph className="m-0 truncate">
                  {data ? data.ProvinceName : 'Select'}
                </Typography.Paragraph>
                <DownOutlined />
              </Flex>
            </Button>
          </Dropdown>
        </Form.Item>
      )}
    />
  );
}
