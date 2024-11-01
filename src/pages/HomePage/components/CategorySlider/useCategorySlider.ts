import { useEffect, useState } from 'react';
import { categoryAPIs } from '../../../../apis/category.api';
import { handleError } from '../../../../utils/handleError';
import { CategoryProps } from '../../../../types/category.type';

const useCategorySlider = () => {
  const [category, setCategory] = useState<CategoryProps[]>();

  const getAllCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      setCategory(res?.data.cates)
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  return {
    category
  };
};

export default useCategorySlider;
