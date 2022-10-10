export const getError = (error) => {
  return error.response?.data?.error || error.message;
};
