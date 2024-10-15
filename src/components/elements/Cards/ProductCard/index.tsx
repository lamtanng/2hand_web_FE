import { EnvironmentFilled } from '@ant-design/icons';
import { Card } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';

const ProductCard = ({key}: {key: number}) => {
  return (
    <Card key={key} cover={<img alt="example" src={defaultImg} />}>
      <p className="truncate text-base">Product name {key}</p>
      <p className="text-lg font-bold">0 VND</p>
      <p className="text-sm text-gray-500">
        <EnvironmentFilled /> Location
      </p>
    </Card>
  );
};

export default ProductCard;
