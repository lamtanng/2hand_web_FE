import { AddressProps } from "./address.type";
import { OrderDetailProps } from "./orderDetail.type";
import { OrderStageProps } from "./orderStage.type";
import { PaymentMethodProps } from "./paymentMethod.type";
import { StoreProps } from "./store.type";
import { UserProps } from "./user.type";

export interface OrderProps {
    _id: string;
    exprDate: Date;
    receiverAddress: AddressProps;
    note: string;
    total: number;
    shipmentCost: number;
    userID: UserProps;
    storeID: StoreProps;
    orderDetailIDs: OrderDetailProps[];
    orderStageID: OrderStageProps;
    paymentMethodID: PaymentMethodProps;
    createAt?: Date;
    updateAt?: Date;
  }