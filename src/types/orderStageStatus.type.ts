import { OrderStageStatus } from './enum/orderStageStatus.enum';
import { OrderRequestProps } from './orderRequest.type';

export interface OrderStageStatusProps {
  _id: string;
  status: OrderStageStatus;
  expectedDate?: Date;
  date?: Date;
  orderStageID: string;
  orderRequestID?: OrderRequestProps;
}
