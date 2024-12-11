export const formattedCurrency = (price: number) => {
  return `${Intl.NumberFormat().format(price)} VND`;
};
