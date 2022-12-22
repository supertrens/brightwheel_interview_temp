import { Reading } from "./interfaces";

/**
 * @abstract Function to dedupe an array based on a given key
 * @param {<T>[]} arr (required) - an array of objects
 * @param {String} key (required) - the key to dedupe
 * @returns {<T>[]} - with unique value
 */
export const getUniqueListBy = (arr: any[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

/**
 * @abstract Simple function to get the latest timestamp in an array of readings
 * @param {Reading[]} readings (required) - a list of readings
 * @returns {Reading} - the latest reading in the list
 */
export const getLatestReading = (readings: Reading[]) => {
  const latestReading = readings.reduce((a, b) => {
    return a.timestamp > b.timestamp ? a : b;
  });

  return latestReading;
};

/**
 * @abstract Simple function to get the cumulative value of the count in an array of readings
 * @param {Reading[]} readings (required) - a list of readings
 * @returns {number} - the sum of all readings count
 */
export const getCumulativeReadingCount = (readings: Reading[]): number => {
  const sum = readings.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );

  return sum;
};
