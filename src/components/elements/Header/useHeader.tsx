import { useEffect, useState } from 'react';
import { CategoryProps } from '../../../types/category.type';
import { categoryAPIs } from '../../../apis/category.api';
import { handleError } from '../../../utils/handleError';

const useHeader = () => {
  const [category, setCategory] = useState<CategoryProps[]>([]);

  const getCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      setCategory(res.data.cates);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return {
    category,
  };
};
export default useHeader();
