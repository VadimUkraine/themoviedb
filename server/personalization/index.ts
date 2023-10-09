import { RESTDataSource } from "@apollo/datasource-rest";
import { Credentials, User } from "../types/auth";
import inMemoryUsersStore from "./store/in-memory-users.store";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { maxAge } from "../helpers/constants";

class PersonalizationAPI extends RESTDataSource {
  async register(name: string, password: string, id: string): Promise<User> {
    const user = inMemoryUsersStore.getUser(name, password);

    if (user) {
      throw new GraphQLError("This User is exist");
    }

    return inMemoryUsersStore.addUser(name, password, id);
  }

  async login(name: string, password: string): Promise<Credentials> {
    const user = inMemoryUsersStore.getUser(name, password);

    if (!user) {
      throw new GraphQLError("Cannot found such user");
    }

    const token = jwt.sign({ id: user.id, name }, process.env.JWT_SECRET, {
      expiresIn: maxAge
    });

    return {
      token,
      id: user.id
    };
  }
}

export default PersonalizationAPI;
