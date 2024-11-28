export interface ReviewProps{
    _id: string,
    content: string,
    rate: number,
    image: string[],
    video: string[],
    likes: number,
    createAt?: Date,
    updateAt?: Date,
    isActive: boolean,
    replyMessage: string,
    reviewerID: string,
    productID: string,
    orderDetailID: string,
}