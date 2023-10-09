type Credentials = {
  token: string;
  id: string;
};

type User = {
  id: string;
  name: string;
  password: string;
  salt: string;
};

export { Credentials, User };
