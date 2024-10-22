import { EnvironmentFilled } from '@ant-design/icons';
import { Card } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';

const ProductCard = ({product}: {product:any}) => {
  return (
    <Card key={product.id} cover={<img alt="example" src={defaultImg} />} className='mx-2 md:mx-5'>
      <p className="truncate text-sm md:text-base">{product.name}</p>
      <p className="text-base md:text-lg font-bold">{product.price} VND</p>
      <p className="text-xs md:text-sm text-gray-500">
        <EnvironmentFilled /> Location
      </p>
    </Card>
  );
};

export default ProductCard;
