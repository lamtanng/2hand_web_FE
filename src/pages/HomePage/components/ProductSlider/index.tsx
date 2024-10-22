import { Link } from 'react-router-dom';
import ProductCard from '../../../../components/elements/Cards/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
    items: 1,
  },
};

const ProductSlider = () => {
  const data = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 8 },
    { key: 9 },
    { key: 10 },
  ];

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      {data && (
        <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px" className='z-0'>
          {data.map((item: any) => (
            <div>
              <Link to={'#'} key={item.key} id="cate-card">
                <ProductCard product={item} />
              </Link>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductSlider;
