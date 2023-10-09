import { GraphQLError } from "graphql";

const AuthenticationError = () => {
  const authErrMessage = "*** you must be logged in ***";
  return new GraphQLError(authErrMessage, {
    extensions: {
      code: "UNAUTHENTICATED"
    }
  });
};

export { AuthenticationError };
