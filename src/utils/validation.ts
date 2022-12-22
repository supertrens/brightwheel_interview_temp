import { body } from "express-validator";

export const postDeviceValidation = [
  // id must be a string
  body("id").isString(),
  // reading must be an array with
  //  - timestamp an ISO-8061
  //  - count a number
  body("readings").isArray(),
  body("readings.*.timestamp", "timestamp field must be a date").isISO8601(),
  body("readings.*.count", "count field must be a number").isNumeric().toInt(),
];
