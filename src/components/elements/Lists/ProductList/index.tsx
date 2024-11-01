import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from '../../Cards/ProductCard';
import useProductList from './useProductList';

const ProductList = () => {
  
  const { product } = useProductList();
  
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {product.map((item: any) => (
        <Col xs={12} md={8} xl={4}>
          <Link to={'#'} key={item.key} id="cate-card">
            <div>
              <ProductCard product={item} />
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
