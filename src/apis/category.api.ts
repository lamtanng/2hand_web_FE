import { categoryPaths } from '../constants/apiPaths/categoryPaths';
import { axiosClient } from './axios';

const getCategoryUrl = (url: string) => `${categoryPaths.categoryPath}/${url}`;
const categoryUrl = getCategoryUrl('');

const getAllCAtegory = () => {
  return axiosClient.get(categoryUrl);
};

export const categoryAPIs = { getAllCAtegory };
