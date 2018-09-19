export const onKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.target.click();
  }
};

export default onKeyPress;
