import { Col, Row } from "antd";
import ProductCard from "../../../../components/elements/Cards/ProductCard";
import { ProductProps } from "../../../../types/product.type";

const ListProducts = ({productList, isLoading}: {productList: ProductProps[], isLoading: boolean}) => {
  return (
    <Row gutter={[0, 24]} className="mt-10">
      {productList?.map((item: ProductProps) => (
        <Col xl={6}>
          <ProductCard product={item} isLoading={isLoading} />
        </Col>
      ))}
    </Row>
  );
};

export default ListProducts;
