import { HTMLInputTypeAttribute } from 'react';
import { Control, FieldPath, FieldValues, Path } from 'react-hook-form';

export interface ControlledInputProps<FormValues extends FieldValues> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: number | boolean | null | undefined;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  isRequired?: boolean;
}
