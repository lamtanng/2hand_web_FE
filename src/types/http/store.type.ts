import { AddressProps } from '../address.type';
import { StoreProps } from '../store.type';

export type NewStoreProps = Omit<
  StoreProps,
  'userID' | '_id' | 'slug' | 'avatar' | 'coverImg' | 'isActive' | 'ghnStoreID'
> & { phoneNumber: string | undefined; userID: string | undefined };

export interface UpdateStoreRequestProps
  extends Pick<StoreProps, | 'avatar' | 'coverImg' | 'name' | 'description'> {
  _id: string | undefined;
  address?: AddressProps[]
}
