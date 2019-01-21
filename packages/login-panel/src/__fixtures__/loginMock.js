const loginMock = (status, message) => {
  return () => ({ status, ...message });
};
export default loginMock;
