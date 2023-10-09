import { AUTH_TOKEN } from "../constants/variables";

const isAuthenticated = (): boolean => {
  return (
    sessionStorage.getItem(AUTH_TOKEN) &&
    sessionStorage.getItem(AUTH_TOKEN).length > 0
  );
};

export default isAuthenticated;
