import { ProductProps } from "./product.type";
import { UserProps } from "./user.type";

export interface ReviewProps{
    _id: string,
    content: string,
    rate: number,
    image: string[],
    video: string[],
    likes: number,
    createdAt?: Date,
    updatedAt?: Date,
    isActive: boolean,
    replyMessage: string,
    reviewerID: UserProps,
    productID: ProductProps,
    orderDetailID: string,
}