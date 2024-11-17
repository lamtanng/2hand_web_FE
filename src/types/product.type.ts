import { AddressProps } from './address.type';
import { CategoryProps } from './category.type';
import { StoreProps } from './store.type';

export interface ProductProps {
  _id?: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  quantity: number;
  quality: string;
  isActive: boolean;
  isSoldOut: boolean;
  cateID: CategoryProps;
  storeID: StoreProps;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  weight: number;
  height: number;
  width: number;
  length: number;
  address: AddressProps;
}
