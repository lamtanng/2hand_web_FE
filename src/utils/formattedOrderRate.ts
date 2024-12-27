export const formattedOrderRate = (orderByStage: number | undefined, totalOrders: number | undefined) => {
  if (totalOrders && orderByStage) {
    if (Number((orderByStage / totalOrders) * 100)) {
      return `${Number((orderByStage / totalOrders) * 100).toFixed(2)}%`;
    }
  }
  return '0%';
};
