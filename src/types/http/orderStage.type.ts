export interface NewOrderStage {
  name: string;
  orderID: string | undefined;
  expectedDate: string | null | undefined;
  orderStageStatusID: string | undefined;
}
