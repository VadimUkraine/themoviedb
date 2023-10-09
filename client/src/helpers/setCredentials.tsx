import { AUTH_TOKEN, USER_ID } from "../constants/variables";

const setCredentials = (token: string, id: string): void => {
  sessionStorage.setItem(AUTH_TOKEN, token as string);
  sessionStorage.setItem(USER_ID, id as string);
};

export default setCredentials;
