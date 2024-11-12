import { FormProvider } from 'react-hook-form';
import useProductForm from './useProductForm';
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Form,
  InputNumber,
  MenuProps,
  message,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import CustomTextArea from '../../../../../components/elements/ControlledComponents/ControlledTextArea';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';
import { DownOutlined, InboxOutlined } from '@ant-design/icons';
import ConditionRadio from '../ConditionRadio';
import { useState } from 'react';
import { ProductQuality } from '../../../../../types/enum/productQuality.enum';
import { CategoryProps } from '../../../../../types/category.type';
import { StoreProps } from '../../../../../types/store.type';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ProductForm = ({category, store} : {category: CategoryProps[], store: StoreProps | undefined}) => {
  const { handleSubmit, method } = useProductForm();
  const [condition, setCondition] = useState(ProductQuality.New);
  console.log(store);

  const items: MenuProps['items'] = category
    .filter((item: CategoryProps) => !item.parentID)
    .map((item: CategoryProps) => {
      return {
        label: item.name,
        key: item._id,
      };
    });

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit}>
        <Form.Item>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
              files.
            </p>
          </Dragger>
        </Form.Item>
        <CustomFormItem name="name" hint="Name" label="Product Name" isRequired={true} />
        <Flex gap={'large'} className="w-full">
          <Form.Item className="w-full">
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">Category</Typography.Paragraph>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button className="h-10 w-full">
                <Flex justify="space-between" className="w-full">
                  <Typography.Paragraph className="m-0 truncate">Select</Typography.Paragraph>
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item className="m-0 w-full">
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">Quantity</Typography.Paragraph>
            <InputNumber min={1} defaultValue={1} className="h-10 w-full text-base" />
          </Form.Item>
          <Flex vertical className="w-full">
            <CustomFormItem name="price" hint="Price" label="Price" className="w-full" />
            <Checkbox>Free Product</Checkbox>
          </Flex>
        </Flex>
        <CustomTextArea name="description" hint="Description" label="Description" isRequired={true} />
        <ConditionRadio onChange={setCondition} selected={condition} />
        <Form.Item>
          <SubmitButton />
        </Form.Item>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
