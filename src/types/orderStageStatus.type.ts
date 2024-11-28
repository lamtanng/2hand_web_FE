import { OrderStageStatus } from './enum/orderStageStatus.enum';

export interface OrderStageStatusProps {
  _id: string;
  status: OrderStageStatus;
  expectedDate?: Date;
  date?: Date;
  orderStageID: string;
  orderRequestID?: string;
}
