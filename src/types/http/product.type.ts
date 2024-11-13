export interface ProductRequestBodyProps {
  name: string | undefined;
  description: string | undefined;
  image: string[];
  price: number | undefined;
  quantity: number | null;
  quality: string | undefined;
  weight: number | undefined;
  cateID: string | undefined;
  storeID: string | undefined;
  isSoldOut?: boolean
}
