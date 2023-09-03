import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import { Movie, MoliesList, MovieDetails } from "../types/movie";
// import normalizedCrew from "./helpers/normalizedCrew";

class MoviesAPI extends RESTDataSource {
  override baseURL = "https://api.themoviedb.org/3/movie/";

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDAwMTE5NmM4YTM3MTQzYmJlOGQ0NDliYTQxMGRmNiIsInN1YiI6IjY0YjQ0NmE1MTIxOTdlMDBjNWY0MTg3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_MDj-zjyVhWlFYe1KGe_YU0rrtoLqxCxIsDxccsc7U";
  }

  async getMoviesLists(): Promise<MoliesList> {
    const playing = await this.get("now_playing");
    const upcoming = await this.get("upcoming");
    const popular = await this.get("popular");
    const normalizedDataPlaying = playing.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date.split("-").reverse().join("/")
      }));
    const normalizedDataUpcoming = upcoming.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date.split("-").reverse().join("/")
      }));
    const normalizedDataPopular = popular.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date.split("-").reverse().join("/")
      }));

    return {
      playing: normalizedDataPlaying,
      upcoming: normalizedDataUpcoming,
      popular: normalizedDataPopular
    };
  }

  async getMovie(id: string): Promise<MovieDetails> {
    const moveDetails = await this.get(`${encodeURIComponent(id)}`);
    const castAndcrew = await this.get(`${encodeURIComponent(id)}/credits`);
    const recommendations = await this.get(
      `${encodeURIComponent(id)}/recommendations`
    );
    const normalizedCrew = castAndcrew.crew.map((item) => ({
      id: item.id,
      name: item.name,
      known_for_department: item.known_for_department,
      job: item.job,
      profile_path:
        (item.profile_path &&
          `https://image.tmdb.org/t/p/w500${item.profile_path}`) ||
        ""
    }));

    const normalizedRecommendations = recommendations.results.map((item) => ({
      id: item.id,
      title: item.title,
      vote_average: Math.round(item.vote_average * 10),
      poster_path:
        (item.poster_path &&
          `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
        ""
    }));

    console.log("recommendations - ", recommendations);

    return {
      details: {
        ...moveDetails,
        poster_path: `https://image.tmdb.org/t/p/w500${moveDetails.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500${moveDetails.backdrop_path}`,
        release_date: moveDetails.release_date.split("-").reverse().join("/"),
        genres: moveDetails.genres.map((genre) => genre.name)
      },
      crew: normalizedCrew,
      recommendations: normalizedRecommendations
    };
  }

  // async getMovieDetails(id): Promise<MovieDetails> {
  //   const data = await this.get(`movies/${id}`, {
  //     params: {
  //       per_page: limit.toString(), // all params entries should be strings,
  //       order_by: "most_viewed"
  //     }
  //   });
  //   return data.results;
  // }
}

export default MoviesAPI;
