import { ProductProps } from "./product.type";
import { ReviewProps } from "./review.tpye";

export interface OrderDetailProps {
    _id: string;
    quantity: number;
    priceTotal: number;
    productID: ProductProps;
    reviewID: ReviewProps;
    orderID: string;
    createAt?: Date;
    updateAt?: Date;
  }