import { OrderStage } from "./enum/orderStage.enum";
import { OrderStageStatusProps } from "./orderStageStatus.type";

export interface OrderStageTrackingProps {
    _id: string;
    name: OrderStage;
    orderStageStatus: OrderStageStatusProps[];
    orderID: string;
}