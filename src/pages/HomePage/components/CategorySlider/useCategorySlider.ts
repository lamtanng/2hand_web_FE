import { categoryAPIs } from '../../../../apis/category.api';
import { handleError } from '../../../../utils/handleError';

const useCategorySlider = () => {
  const getAllCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      return res;
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return {
    getAllCategory
  };
};

export default useCategorySlider;
