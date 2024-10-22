import { productAPIs } from '../../../../apis/product.api';
import { handleError } from '../../../../utils/handleError';

const useProductList = () => {
  const getProducts = async (page: number, limit: number, search: string) => {
    try {
      const res = await productAPIs.getAllProduct(page, limit, search);
      return res;
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return {
    getProducts
  };
};

export default useProductList;
