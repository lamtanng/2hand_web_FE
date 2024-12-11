export const formattedOrderStageStatus = (status: string) => {
  return status.replace(/([A-Z])/g, ' $1').trim();
};
