type Recommendation = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

type MovieDetailsRecommendationsProps = {
  recommendations: Recommendation[];
  recommendationsHeaderText?: string;
};

export { MovieDetailsRecommendationsProps };
