export const timeStampToTime = (timestamp: any) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  let hours12 = hours % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }

  return `${hours12}:${minutes} ${ampm}`;
};

export const dateObjectToString = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}