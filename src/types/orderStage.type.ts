import { OrderStage } from "./enum/orderStage.enum";

export interface OrderStageProps {
    _id: string;
    name: OrderStage;
    orderStageStatusID: string;
    orderID: string;
    createAt?: Date;
    updateAt?: Date;
  }