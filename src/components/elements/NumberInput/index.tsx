import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const NumberInput = () => {
  return (
    <Input
      size="large"
      addonAfter={
        <Button type="text" className="p-0 hover:bg-transparent">
          <PlusOutlined />
        </Button>
      }
      addonBefore={
        <Button type="text" className="p-0 hover:bg-transparent">
          <MinusOutlined />
        </Button>
      }
      className="w-32 text-center text-base"
      defaultValue={0}
    />
  );
};

export default NumberInput;
