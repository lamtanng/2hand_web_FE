import { OrderStage } from "./enum/orderStage.enum";
import { OrderStageStatusProps } from "./orderStageStatus.type";

export interface OrderStageProps {
    _id: string;
    name: OrderStage;
    orderStageStatusID: OrderStageStatusProps;
    orderID: string;
    createAt?: Date;
    updateAt?: Date;
  }