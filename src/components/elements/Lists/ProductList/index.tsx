import ProductCard from '../../Cards/ProductCard';
import useProductList from './useProductList';
import { ProductProps } from '../../../../types/product.type';

const ProductList = () => {
  const { product } = useProductList();

  return (
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 md:gap-x-0 md:gap-y-6 xl:grid-cols-5">
        {product.map((item: ProductProps) => (
          <div key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
