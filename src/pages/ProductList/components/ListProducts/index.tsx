import { Col, Row } from "antd";
import ProductCard from "../../../../components/elements/Cards/ProductCard";

const ListProducts = ({productList}: {productList: any}) => {
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {productList?.map((item: any) => (
        <Col xl={6}>
          <ProductCard product={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ListProducts;
