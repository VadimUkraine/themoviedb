import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import MoviesAPI from "./movies";
import SettingsAPI from "./settings";
import TranslationsAPI from "./translations";
import PersonalizationAPI from "./personalization";
import WishListsAPI from "./wishlists";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import "dotenv/config";
interface ContextValue {
  dataSources: {
    moviesAPI: MoviesAPI;
    settingsAPI: SettingsAPI;
    translationsAPI: TranslationsAPI;
    personalizationAPI: PersonalizationAPI;
    wishListsAPI: WishListsAPI;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.GRAPHQL_PORT) },
  context: async ({ req }) => {
    const { cache } = server;
    const token = req.headers.authorization.split(" ")[1] || "";

    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        moviesAPI: new MoviesAPI({ cache }),
        settingsAPI: new SettingsAPI({ cache }),
        translationsAPI: new TranslationsAPI({ cache }),
        personalizationAPI: new PersonalizationAPI({ cache }),
        wishListsAPI: new WishListsAPI({ cache, token })
      }
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);
