const validatePassword = (value: string): boolean => {
  const password = value.toString().trim();

  if (
    password.length === 0 ||
    (password.length < 8 && password.length !== 0) ||
    (!password.match(/[A-Z]/g) && password.length !== 0) ||
    (!password.match(/[a-z]/g) && password.length !== 0) ||
    (!password.match(/\d/g) && password.length !== 0)
  ) {
    return true;
  }

  return false;
};

export default validatePassword;
