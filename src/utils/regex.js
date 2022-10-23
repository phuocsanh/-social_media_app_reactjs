export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$@!%&*?])[A-Za-zd#$@!%&*?]{8,30}$/;
