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
    cateID: string,
    storeID: string,
    slug: string,
    creatAt?: Date,
    updateAt?: Date
}