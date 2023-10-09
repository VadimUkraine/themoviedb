import { randomBytes, pbkdf2Sync } from "crypto";

const inMemoryUsersStore = {
  users: [],

  getUser: (name: string, password: string) => {
    const user = inMemoryUsersStore.users.find((item) => {
      const hash = pbkdf2Sync(password, item.salt, 1000, 64, `sha512`).toString(
        `hex`
      );

      return item.name === name && item.password === hash;
    });

    return user;
  },

  getUserById: (id: string) => {
    return inMemoryUsersStore.users.find((item) => item.id === id);
  },

  addUser: (name: string, password: string, id: string) => {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    inMemoryUsersStore.users.push({ name, password: hash, id, salt });

    return inMemoryUsersStore.getUserById(id);
  }
};

export default inMemoryUsersStore;
