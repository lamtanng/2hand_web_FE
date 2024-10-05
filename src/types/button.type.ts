import { ReactNode } from 'react';

export default interface ButtonProps {
  text?: string | ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  type?: HTMLButtonElement['type'];
  isDirty?: boolean;
}
