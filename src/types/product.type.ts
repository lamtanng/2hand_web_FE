import { CategoryProps } from "./category.type";
import { StoreProps } from "./store.type";

export interface ProductProps {
    id: string,
    name: string,
    description: string,
    image: string[],
    price: number,
    quantity: number,
    quality: string,
    isActive: boolean,
    isSoldOut: boolean,
    cateID: CategoryProps,
    storeID: StoreProps,
    slug: string,
    creatAt?: Date,
    updateAt?: Date
}