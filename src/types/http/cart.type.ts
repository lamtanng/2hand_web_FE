export interface NewCartItemProps {
  userID: string | undefined;
  items: { productID: string | undefined; quantity: number }[];
}

export interface DeleteCartItemProps {
  userID: string | undefined;
  productID: string | undefined;
}
