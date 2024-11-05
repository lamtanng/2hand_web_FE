import { Col, Row } from "antd";
import ProductCard from "../../../../components/elements/Cards/ProductCard";

const ListProducts = ({productList, isLoading}: {productList: any, isLoading: boolean}) => {
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {productList?.map((item: any) => (
        <Col xl={6}>
          <ProductCard product={item} isLoading={isLoading} />
        </Col>
      ))}
    </Row>
  );
};

export default ListProducts;
