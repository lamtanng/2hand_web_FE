import { ReactNode } from 'react';
import { toast } from 'react-toastify';

export const displaySuccess = (content: string | null | ReactNode) => {
  toast.success(content);
};
export const displayError = (content: string | null) => {
  toast.error(content);
};
export const displayInfo = (content: string | null) => {
  toast.info(content);
};
