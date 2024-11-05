import { ProductProps } from "./product.type";
import { StoreProps } from "./store.type";

export interface CartProps {
    store: StoreProps,
    products: CartItemProps[],
}

export interface CartItemProps {
    _id: string,
    productID: ProductProps,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
}