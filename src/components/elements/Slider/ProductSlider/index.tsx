import ProductCard from '../../Cards/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ProductProps } from '../../../../types/product.type';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ProductSlider = ({ product, isLoading }: { product: ProductProps[]; isLoading: boolean }) => {

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      {product && (
        <Carousel responsive={responsive} className="z-0">
          {product.map((item: any) => (
            <div key={item.key}>
              <ProductCard product={item} isLoading={isLoading} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductSlider;
