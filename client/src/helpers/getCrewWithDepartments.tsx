const getCrewWithDepartments = (crew) => {
  const data = {};
  const departments: string[] = Array.from(
    new Set(crew.map((item) => item.known_for_department))
  );

  departments.forEach((department: string) => {
    data[department] = [];
  });

  crew.forEach((item) => {
    if (!data[item.known_for_department].find((elem) => elem.id === item.id)) {
      data[item.known_for_department].push({
        id: item.id,
        name: item.name,
        profile_path: item.profile_path,
        job: item.job
      });
    }
  });

  return data;
};

export default getCrewWithDepartments;
