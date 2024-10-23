import { Col, Row } from 'antd';
import ProductCard from '../../Cards/ProductCard';
import useProductList from './useProductList';

const ProductList = () => {
  
  const { product } = useProductList();
  
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {product.map((item: any) => (
        <Col xs={12} md={8} xl={6} xxl={4}>
          <ProductCard product={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
