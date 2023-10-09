type Crew = {
  id: string;
  name: string;
  known_for_department: string;
  profile_path: string;
  job: string;
};

type MovieCrewProps = {
  crew: Crew[];
  crewHeaderText: string;
  noImageText: string;
};

export { MovieCrewProps };
