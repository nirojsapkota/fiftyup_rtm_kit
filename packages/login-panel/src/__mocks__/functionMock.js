export const loginMock = (status, message) => {
  return () => ({ status, ...message });
};
