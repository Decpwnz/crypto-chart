export const startDateStringToUnix = (string) => {
  const dateObject = new Date(string);
  const dateUnixTimestamp = dateObject.getTime();
  const unixInSeconds = dateUnixTimestamp / 1000;
  return unixInSeconds;
};

export const endDateStringToUnix = (string) => {
  const dateObject = new Date(string);
  const dateUnixTimestamp = dateObject.getTime();
  const unixInSeconds = dateUnixTimestamp / 1000;
  return unixInSeconds;
};

export function unixTimestampToDDMMYYYY(unixTimestamp) {
  const date = new Date(unixTimestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
