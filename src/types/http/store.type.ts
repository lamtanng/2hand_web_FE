import { StoreProps } from '../store.type';
import { UserProps } from '../user.type';

export type NewStoreProps = StoreProps & Pick<UserProps, 'phoneNumber' | '_id'>;
