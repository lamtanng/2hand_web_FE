import { AddressProps } from '../address.type';

export interface AddressRequestProps {
  _id: string | undefined;
  address: AddressProps;
}

export interface DeleteAddressRequest {
  _id: string | undefined;
  addressID: string | undefined;
}
