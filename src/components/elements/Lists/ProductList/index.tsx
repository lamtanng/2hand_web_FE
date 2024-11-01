import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from '../../Cards/ProductCard';
import { useEffect, useState } from 'react';
import useProductList from './useProductList';

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const { getProducts } = useProductList();
  
  const getAllProduct = async (page: number, limit: number, search: string) => {
    const res = await getProducts(page, limit, search);
    setProduct(res?.data.response.products);
  };

  useEffect(() => {
    getAllProduct(1, 10, '');
  }, []);
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
