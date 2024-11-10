import { AddressProps } from './address.type';
import { UserProps } from './user.type';

export interface StoreProps {
  _id: string;
  name: string | undefined;
  slug: string;
  description: string | undefined;
  address: AddressProps[];
  avatar: string;
  coverImg: string;
  isActive: boolean;
  createAt?: Date;
  updateAt?: Date;
  userID: UserProps;
  ghnStoreID: string;
}
