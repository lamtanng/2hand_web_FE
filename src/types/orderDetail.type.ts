import { ProductProps } from "./product.type";

export interface OrderDetailProps {
    _id: string;
    quantity: number;
    priceTotal: number;
    productID: ProductProps;
    orderID: string;
    createAt?: Date;
    updateAt?: Date;
  }