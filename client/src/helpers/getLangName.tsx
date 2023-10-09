const getLangName = (language: string): string => {
  return language.split("-")[0];
};

export default getLangName;
