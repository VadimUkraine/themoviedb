import { AUTH_TOKEN, USER_ID } from "../constants/variables";

const removeCredentials = (): void => {
  sessionStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(USER_ID);
};

export default removeCredentials;
