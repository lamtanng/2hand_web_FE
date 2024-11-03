export interface StoreProps {
    id: string,
    name: string,
    description: string,
    address: string[],
    isActive: boolean,
    userID: string,
    slug: string,
    creatAt?: Date,
    updateAt?: Date
}