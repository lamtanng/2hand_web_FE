export const extractISODate = (inputString: string | undefined) => {
    const dateRegex = /(\d{2}-\d{2}-\d{4})/;
    const match = inputString?.match(dateRegex);
    if (match) {
      const [day, month, year] = match[1].split('-');
      return `${year}-${month}-${day}`;
    }
    return null;
  };