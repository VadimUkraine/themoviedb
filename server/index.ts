import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import MoviesAPI from "./movies";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movie {
    id: ID!
    title: String!
    poster_path: String!
    release_date: String!
  }

  type MoviesList {
    playing: [Movie!]!
    upcoming: [Movie!]!
    popular: [Movie!]!
  }

  type MovieDetailsById {
    id: ID!
    title: String!
    poster_path: String!
    overview: String!
    release_date: String!
    tagline: String!
    backdrop_path: String!
    genres: [String!]!
    runtime: Int
  }

  type MovieCrew {
    id: Int
    name: String!
    known_for_department: String!
    profile_path: String!
    job: String!
  }

  type Recommendations {
    id: Int
    title: String!
    vote_average: Int
    poster_path: String!
  }

  type MovieDetails {
    details: MovieDetailsById
    crew: [MovieCrew!]!
    recommendations: [Recommendations!]!    
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    moviesLists: MoviesList
    movieById(id: ID!): MovieDetails!
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    moviesLists: async (_, __, { dataSources }) => {
      return dataSources.moviesAPI.getMoviesLists();
    },
    movieById: async (_, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovie(id);
    }
  }
};

interface ContextValue {
  dataSources: {
    moviesAPI: MoviesAPI;
    // personalizationAPI: PersonalizationAPI;
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
  listen: { port: 8080 },
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        moviesAPI: new MoviesAPI({ cache })
        // personalizationAPI: new PersonalizationAPI({ cache })
      }
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);
