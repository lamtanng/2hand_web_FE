export const formattedCurrency = (price: number | undefined) => {
  if (price) {
    return `${Intl.NumberFormat().format(price)} VND`;
  }
  return '0 VND'
};
