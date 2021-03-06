export const capitalize = (word: string, lowerRest = false): string => {
  const [first, ...rest] = word;
  return (
    first.toUpperCase() +
    (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
  );
};

export const detectDeviceType = (): 'Mobile' | 'Desktop' =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

export const insertAt = <T>(arr: T[], i: number, value: T) => {
  arr.splice(i, 0, value);
  return arr;
};
