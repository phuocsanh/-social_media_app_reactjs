export const onlyEnterNumber = (evt) => {
  if (!/[0-9]/.test(evt.key) && evt.key !== "Backspace") {
    evt.preventDefault();
  }
};
