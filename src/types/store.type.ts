import { UserProps } from "./user.type";

export interface StoreProps {
    _id: string,
    name: string,
    description: string,
    address: string[],
    isActive: boolean,
    userID: UserProps,
    slug: string,
    createdAt?: Date,
    updatedAt?: Date
}