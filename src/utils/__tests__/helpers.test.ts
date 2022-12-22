import * as helpers from "../helpers";
import { Reading } from "../interfaces";

describe("Helpers", () => {
  const readings: Reading[] = [
    {
      timestamp: "2021-09-29T16:08:15+01:00",
      count: 2,
    },
    {
      timestamp: "2021-09-29T16:09:15+01:00",
      count: 15,
    },
    {
      timestamp: "2022-09-29T16:09:15+04:00",
      count: 5,
    },
  ];

  it("should getCumulativeReadingCount", () => {
    const count = helpers.getCumulativeReadingCount(readings);
    expect(count).toBe(22);
  });

  it("should getLatestReading", () => {
    const latest = helpers.getLatestReading(readings);
    expect(latest).toEqual({
      timestamp: "2022-09-29T16:09:15+04:00",
      count: 5,
    });
  });

  it("should dedupe list", () => {
    const newReadings = [
      readings[0], // dupe value
      {
        timestamp: "2022-12-10T16:08:15+01:00",
        count: 2,
      },
    ];

    const readingsConcat = [...readings, ...newReadings];

    const dedupeReading = helpers.getUniqueListBy(readingsConcat, "timestamp");
    expect(readingsConcat.length).toEqual(5);
    expect(dedupeReading.length).toEqual(4);
  });
});
