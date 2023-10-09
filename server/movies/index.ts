import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import {
  Movie,
  MoviesList,
  MovieDetails,
  FilteredMoviesList,
  Genre,
  MovieCrew,
  Recommendations
} from "../types/movie";
import { getRandomNumber } from "./helpers/getRandomNumber";
import { MAX_PAGES } from "./constants";
import inMemorySettingsStore from "../settings/store/in-memory-settings.store";

class MoviesAPI extends RESTDataSource {
  override baseURL = process.env.TMDB_URL;

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["authorization"] = process.env.TMDB_TOKEN;
  }

  async getMoviesLists(): Promise<MoviesList> {
    const language = inMemorySettingsStore.getLang();
    const playing = await this.get("movie/now_playing", {
      params: {
        language
      }
    });
    const upcoming = await this.get("movie/upcoming", {
      params: {
        language
      }
    });
    const popular = await this.get("movie/popular", {
      params: {
        language
      }
    });
    const normalizedDataPlaying = playing.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        release_date: movie.release_date.split("-").reverse().join("/")
      }));
    const normalizedDataUpcoming = upcoming.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        release_date: movie.release_date.split("-").reverse().join("/")
      }));
    const normalizedDataPopular = popular.results
      .slice(0, 5)
      .map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        release_date: movie.release_date.split("-").reverse().join("/")
      }));

    return {
      playing: normalizedDataPlaying,
      upcoming: normalizedDataUpcoming,
      popular: normalizedDataPopular
    };
  }

  async getMovie(id: string): Promise<MovieDetails> {
    const language = inMemorySettingsStore.getLang();
    const movieDetails = await this.get(`movie/${encodeURIComponent(id)}`, {
      params: {
        language
      }
    });
    const castAndcrew = await this.get(
      `movie/${encodeURIComponent(id)}/credits`,
      {
        params: {
          language
        }
      }
    );
    const recommendations = await this.get(
      `movie/${encodeURIComponent(id)}/recommendations`,
      {
        params: {
          language
        }
      }
    );
    const normalizedCrew = castAndcrew.crew.map((item: MovieCrew) => ({
      ...item,
      profile_path:
        (item.profile_path &&
          `https://image.tmdb.org/t/p/w500${item.profile_path}`) ||
        ""
    }));

    const normalizedRecommendations = recommendations.results.map(
      (item: Recommendations) => ({
        ...item,
        vote_average: Math.round(item.vote_average * 10),
        poster_path:
          (item.poster_path &&
            `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
          ""
      })
    );

    return {
      details: {
        ...movieDetails,
        poster_path: movieDetails.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
          : "",
        backdrop_path: movieDetails.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`
          : "",
        release_date: movieDetails.release_date.split("-").reverse().join("/"),
        genres: movieDetails.genres.map((genre: Genre) => genre.name)
      },
      crew: normalizedCrew,
      recommendations: normalizedRecommendations
    };
  }

  async getFilteredMovies(
    page: number,
    with_genres: string,
    dateFrom: string,
    dateTo: string
  ): Promise<FilteredMoviesList> {
    const language = inMemorySettingsStore.getLang();
    const data = await this.get("discover/movie", {
      params: {
        page: page.toString(),
        with_genres,
        "release_date.gte": dateFrom,
        "release_date.lte": dateTo,
        language
      }
    });

    const normalizedListData = data.results.map((movie: Movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      release_date: movie.release_date.split("-").reverse().join("/")
    }));

    return {
      list: normalizedListData,
      totalPages: data.total_pages
    };
  }

  async getFiltersGenres(): Promise<[Genre]> {
    const lang = inMemorySettingsStore.getLang();
    const data = await this.get(`genre/movie/list`, {
      params: {
        language: lang.split("-")[0]
      }
    });

    return data.genres;
  }

  async getRandomMovie(
    page: string,
    with_genres: string,
    dateFrom: string,
    dateTo: string
  ): Promise<Movie> {
    const language = inMemorySettingsStore.getLang();
    const data = await this.get("discover/movie", {
      params: {
        page,
        with_genres,
        "release_date.gte": dateFrom,
        "release_date.lte": dateTo,
        language
      }
    });
    const randomPage = getRandomNumber(
      1,
      data.total_pages > MAX_PAGES ? MAX_PAGES : data.total_pages
    );

    const randomData = await this.get("discover/movie", {
      params: {
        page: randomPage.toString(),
        with_genres,
        "release_date.gte": dateFrom,
        "release_date.lte": dateTo,
        language
      }
    });

    const randomMovieNumber = getRandomNumber(1, randomData.results.length);
    const randomMovie = randomData.results[randomMovieNumber];

    return !randomMovie
      ? null
      : {
          ...randomMovie,
          poster_path: randomMovie.poster_path
            ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
            : "",
          release_date: randomMovie.release_date.split("-").reverse().join("/")
        };
  }
}

export default MoviesAPI;
