import { GRAPHQL_ERRORS } from "../apollo/constants";

type GRAPHQLError = {
  extensions?: {
    code?: string;
  };
};

const isUnAuth = (graphQLErrors): boolean => {
  let isAuth = false;

  graphQLErrors.forEach((err: GRAPHQLError) => {
    if (err.extensions?.code === GRAPHQL_ERRORS.UNAUTHENTICATED) {
      isAuth = true;
    }
  });

  return isAuth;
};

export default isUnAuth;
