const getTimeFromMins = (
  mins: number,
  hourReductionText: string,
  minuteReductionText: string
): string => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}${hourReductionText} ${minutes}${minuteReductionText}`;
};

export default getTimeFromMins;
