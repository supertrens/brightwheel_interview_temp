import { Reading } from "./interfaces";

export const getUniqueListBy = (arr: any[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const getLatestReading = (readings: Reading[]) => {
  const latestReading = readings.reduce((a, b) => {
    return a.timestamp > b.timestamp ? a : b;
  });

  return latestReading;
};

export const getCumulativeReadingCount = (readings: Reading[]): number => {
  const sum = readings.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );

  return sum;
};
