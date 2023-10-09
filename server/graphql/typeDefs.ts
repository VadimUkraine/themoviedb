// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

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

  type FilteredMoviesList {
    list: [Movie!]!
    totalPages: Int
  }

  type Genre {
    id: Int
    name: String!
  }

  type Lang {
    lang: String!
  }
  
  type HeaderTranslations {
    dashboardLink: String!
    moviesLink: String!
    randomMovieLink: String!
    btnLogin: String!
    defaultLang: String!
    ruLang: String!
    btnReloadPage: String!
    btnClose: String!
    errorMessage: String!
    singIn: String!
    signOut: String!
    name: String!
    password: String!
    loginToAccount: String!
    register: String!
    userNameHelperText: String!
    userPasswordHelperText: String!
    registerTextSuccess: String!
    registerTextError: String!
    loginTextError: String!
    lists: String!
  }
  
  type DashboardTranslations {
    nowPlaying: String!
    upcoming: String!
    popular: String!
    btnDetails: String!
    noImage: String!
    errorMessage: String!
    noData: String!
  }

  type MoviesTranslations {
    btnDetails: String!
    noImage: String!
    btnApply: String!
    filtersReleaseDates: String!
    filtersGenres: String!
    filterFrom: String!
    filtersTo: String!
    errorMessage: String!
    noData: String!
    genresErrorMessage: String!
  }

  type RandomMovieTranslations {
    btnDetails: String!
    noImage: String!
    btnApply: String!
    filtersReleaseDates: String!
    filtersGenres: String!
    filterFrom: String!
    filtersTo: String!
    errorMessage: String!
    noData: String!
    genresErrorMessage: String!
  }
  
  type MovieDetailsTranslations {
    overview: String!
    crew: String!
    recommendations: String!
    hour: String!
    minute: String!
    noImage: String!
    errorMessage: String!
  }
  
  type Credentials {
    token: String!
    id: String!
  }

  type User {
    id: String!
    name: String!
    password: String!
  }
  
  type List {
    id: String!
    name: String!
    quantity: Int
  }
  
  type CreateListsTranslations {
    errorListExist: String!
    listCreated: String!
    createNewList: String!
    nameOfNewList: String!
    create: String!
    addToOneOfYourLists: String!
    errorMovieExist: String!
    movieWasAdded: String!
  }

  type ListMovie {
    movieId: String!
    movieTitle: String!
    posterPath: String!
  }

  type UserListsTranslations {
    errorListExist: String
    listCreated: String
    nameOfNewList: String
    create: String
    createList: String
    errorMessage: String
    noData: String
    myLists: String
    delete: String
    item: String
    items: String
  }
  
  type UserMoviesListTranslations {
    errorMessage: String
    noData: String
    delete: String
    noImage: String
  }

  type NotFoundTranslations {
    notFound: String
  }
  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  type Query {
    moviesLists: MoviesList
    movieById(id: ID!): MovieDetails!
    filteredMoviesList(page: Int, with_genres: String, dateFrom: String,
      dateTo: String): FilteredMoviesList
    filtersGenresList: [Genre!]!
    randomMovie(page: String, with_genres: String, dateFrom: String,
      dateTo: String): Movie
    language: Lang
    headerTranslations: HeaderTranslations
    dashboardTranslations: DashboardTranslations
    moviesTranslations: MoviesTranslations
    randomMovieTranslations: RandomMovieTranslations
    movieDetailsTranslations: MovieDetailsTranslations
    createListsTranslations: CreateListsTranslations
    userLists(userId: String!): [List!]!
    userListsTranslations: UserListsTranslations
    userMoviesList(listId: String!): [ListMovie!]!
    userMoviesListTranslations: UserMoviesListTranslations
    notFoundTranslations: NotFoundTranslations
  }

  type Mutation {
    changeLanguage(lang: String): Lang
    register(name: String!, password: String!, id: String!): User!
    login(name: String!, password: String!): Credentials!
    createList(userId: String!, id: String!, name: String!): List!
    addMovieToList(userId: String!, movieId: String!, movieTitle: String!, posterPath: String!, listId: String!): ListMovie!
    deleteList(listId: String!): List!
    removeUserMovie(listId: String!, movieId: String!): ListMovie!
  }
`;
