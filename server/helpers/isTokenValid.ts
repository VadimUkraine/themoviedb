import jwt from "jsonwebtoken";
import inMemoryUsersStore from "../personalization/store/in-memory-users.store";

type JwtPayload = {
  id: string;
  name: string;
};

export const isTokenValid = (token: string): boolean => {
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodeToken) return false;

  const { id, name } = decodeToken as JwtPayload;
  const user = inMemoryUsersStore.getUserById(id);

  return user.name === name && user.id === id;
};
