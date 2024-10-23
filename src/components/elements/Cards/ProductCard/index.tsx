import { EnvironmentFilled } from '@ant-design/icons';
import { Card } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link to={'/product-detail'} key={product.id} id="cate-card">
        <Card cover={<img alt="example" src={defaultImg} />} className="mx-2 md:mx-5">
          <p className="truncate text-sm md:text-base">{product.name}</p>
          <p className="text-base font-bold md:text-lg">{product.price} VND</p>
          <p className="text-xs text-gray-500 md:text-sm">
            <EnvironmentFilled /> Location
          </p>
        </Card>
    </Link>
  );
};

export default ProductCard;
