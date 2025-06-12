import { AddressProps } from "../address.type";

export interface ProductRequestBodyProps {
  _id?: string;
  name: string | undefined;
  description: string | undefined;
  image: string[];
  price: number | undefined;
  quantity: number | null | undefined;
  quality: string | undefined;
  cateID: string | undefined;
  storeID: string | undefined;
  isSoldOut?: boolean;
  weight: number | undefined;
  height: number | undefined;
  width: number | undefined;
  length: number | undefined;
  address?: AddressProps;
  isApproved?: boolean;
}
