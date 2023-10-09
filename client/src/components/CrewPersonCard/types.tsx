type CrewPerson = {
  id: string;
  name: string;
  profile_path: string;
  job: string;
};

type CrewPersonCardProps = {
  person: CrewPerson;
  noImageText: string;
};

export { CrewPersonCardProps };
