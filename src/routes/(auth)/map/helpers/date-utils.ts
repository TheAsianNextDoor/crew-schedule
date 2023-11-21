export const getFormattedDate = (dateString: string | null) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  let day: string | number = date.getDate();
  let month: string | number = date.getMonth();
  const year = date.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${month}/${day}/${year}`;
};
