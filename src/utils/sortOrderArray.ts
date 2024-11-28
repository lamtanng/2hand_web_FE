import { OrderProps } from "../types/order.type";

export const sortOrderArray = (arr: OrderProps[]) => {
    return arr.sort((a: OrderProps, b: OrderProps) => {
      return a.updateAt && b.updateAt ? a.updateAt?.valueOf() - b.updateAt?.valueOf() : 0;
    });
  };