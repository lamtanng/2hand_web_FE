export const formattedOrderRate = (orderByStage: number, totalOrders: number) => {
  if (Number((orderByStage / totalOrders) * 100)) {
    return `${Number((orderByStage / totalOrders) * 100).toFixed(2)}%`;
  }
  return '0%';
};
