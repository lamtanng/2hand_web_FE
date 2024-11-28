import { AddressProps } from '../address.type';
import { ProductProps } from '../product.type';
import { MoMoPaymentItemsProps } from './momoPayment.type';

export interface CalcShippingFeeRequestProps {
  shopid: number;
  weight: number;
  service_type_id: number;
  from_district_id: number | undefined;
  from_ward_code: string | undefined;
  to_district_id: number | undefined;
  to_ward_code?: string | undefined;
  insurance_value?: number;
  height?: number;
  length?: number;
  width?: number;
  cod_value?: number;
  items?: CalcShippingFeeItemProps[];
}

export interface CalcShippingFeeItemProps
  extends Pick<ProductProps, 'name' | 'quantity' | 'height' | 'weight' | 'length' | 'width'> {}

export interface GetAvailableServiceRequestProps {
  shop_id: number | undefined;
  from_district: number | undefined;
  to_district: number | undefined;
}

export interface CreatedOrderProps {
  storeID: string | undefined;
  total: number;
  note: string;
  shipmentCost: number;
  items: MoMoPaymentItemsProps[];
}

export interface CreateCODPaymentRequestProps {
  userID: string | undefined;
  total: number;
  paymentMethodID: string | undefined;
  receiverAddress: AddressProps | undefined;
  orders: CreatedOrderProps[];
}

export interface CalcExpectedDeliveryDateRequest {
  ShopID?: number | undefined;
  from_district_id: number | undefined;
  from_ward_code: string | undefined;
  to_district_id: number | undefined;
  to_ward_code: string | undefined;
  service_id?: string;
}
