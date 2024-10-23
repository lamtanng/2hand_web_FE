import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../../../../components/elements/Cards/ProductCard";

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

const ListProducts = () => {
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {data.map((item: any) => (
        <Col xl={6}>
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

export default ListProducts;
