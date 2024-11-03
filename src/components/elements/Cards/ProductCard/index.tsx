import { EnvironmentFilled } from '@ant-design/icons';
import { Card } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';
import { Link } from 'react-router-dom';
import { ProductProps } from '../../../../types/product.type';

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <Link to={`/${product.slug}`} key={product.id} id="cate-card" className="no-underline">
      <Card cover={<img alt="example" src={defaultImg} />} className="relative mx-2 md:mx-3">
        <p className="truncate text-sm md:text-base">{product.name}</p>
        <p className="text-base font-bold md:text-lg">
        {product && new Intl.NumberFormat().format(product.price)} VND
        </p>
        <p className="text-xs text-gray-500 md:text-sm">
          <EnvironmentFilled /> Location
        </p>
        {!(product.quantity !== 0) && (
          <div className="absolute top-20 z-10 translate-x-1/2 rounded-full bg-black bg-opacity-65 px-5 py-10 font-semibold text-white">
            Sold Out
          </div>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
