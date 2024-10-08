import { FormItemProps } from "antd";

export interface CustomFormItemProps extends FormItemProps {
    label?: string;
    name: string;
    hint: string;
    type?: string;
    isRequired?: boolean;
  }