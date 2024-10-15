import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from '../../../../components/elements/Cards/ProductCard';

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

  const onPrevClick = () => {
    const slider = document.getElementById('product-slider');
    slider?.classList.remove('-translate-x-full');
  };

  const onNextClick = () => {
    const slider = document.getElementById('product-slider');
    slider?.classList.add('-translate-x-full', 'ease-in-out', 'duration-500');
  };

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      <div>
        <Button type="text" className="absolute top-1/2 z-10 rounded-full px-2 py-1" onClick={onPrevClick}>
          <LeftOutlined />
        </Button>
      </div>
      <div>
        <Button type="text" className="absolute right-0 top-1/2 z-10 rounded-full px-2 py-1" onClick={onNextClick}>
          <RightOutlined />
        </Button>
      </div>
      <div className="mx-10 overflow-hidden">
        <div id="product-slider" className="flex">
          {data.map((item: any) => (
            <Link to={'#'} key={item.key} id="cate-card" className="w-1/5 flex-shrink-0">
              <div className='pr-6'>
                <ProductCard key={item.key} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
