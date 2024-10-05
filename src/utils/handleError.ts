import axios, { AxiosError } from 'axios';
import { displayError } from './displayToast';

export const handleError = (error: AxiosError | any) => {
  if (axios.isAxiosError(error)) {
    error.response ? displayError(error.response?.data.message) : displayError(error.message);
  } else {
    displayError(error.message);
  }
};
