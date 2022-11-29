export const hasItemExpired = (item) => {
  const now = new Date();
  const hasExpired =
    item && now.getTime() >= new Date(item?.end_date).getTime();
  return hasExpired;
};
