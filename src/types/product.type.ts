import { CategoryProps } from "./category.type";
import { StoreProps } from "./store.type";

export interface ProductProps {
    _id?: string,
    name: string,
    description: string,
    image: string[],
    price: number,
    quantity: number,
    quality: string,
    weight: number,
    isActive: boolean,
    isSoldOut: boolean,
    cateID: CategoryProps,
    storeID: StoreProps,
    slug: string,
    createdAt?: Date,
    updatedAt?: Date
}