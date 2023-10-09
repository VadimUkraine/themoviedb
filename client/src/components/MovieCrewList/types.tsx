type CrewPerson = {
  id: string;
  name: string;
  profile_path: string;
  job: string;
};

type MovieCrewListProps = {
  department: string;
  departmentCrew: CrewPerson[];
  noImageText: string;
};

export { MovieCrewListProps };
