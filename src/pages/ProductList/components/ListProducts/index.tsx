import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../../../../components/elements/Cards/ProductCard";

const ListProducts = ({productList}: {productList: any}) => {
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {productList.map((item: any) => (
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
