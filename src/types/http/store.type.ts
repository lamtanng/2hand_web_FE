import { StoreProps } from '../store.type';

export type NewStoreProps = Omit<
  StoreProps,
  'userID' | '_id' | 'slug' | 'avatar' | 'coverImg' | 'isActive' | 'ghnStoreID'
> & { phoneNumber: string | undefined; userID: string | undefined };
