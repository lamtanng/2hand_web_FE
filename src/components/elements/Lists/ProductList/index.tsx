import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from '../../Cards/ProductCard';

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

const ProductList = () => {
  return (
    <Row gutter={[24, 24]} className="mt-10">
      {data.map((item: any) => (
        <Col span={4}>
          <Link to={'#'} key={item.key} id="cate-card">
            <div className="pr-6">
              <ProductCard key={item.key} />
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
