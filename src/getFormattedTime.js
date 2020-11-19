// formatar tempo da maneira correta
export function getFormattedTime(fullTimeInSeconds) {
  const oneHour = 3600;
  const fullTime = fullTimeInSeconds;

  const hours = Math.floor(fullTime / oneHour);
  const minutes = Math.floor((fullTime % oneHour) / 60);
  const seconds = fullTime % 60;

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds}`;
}
