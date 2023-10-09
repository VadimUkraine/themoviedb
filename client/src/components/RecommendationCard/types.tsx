type Recommendation = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

type RecommendationProps = {
  recommendation: Recommendation;
};

export { RecommendationProps };
