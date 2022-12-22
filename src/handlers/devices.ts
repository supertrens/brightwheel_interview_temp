import { validationResult } from "express-validator";
import { getCumulativeReadingCount, getLatestReading } from "../utils/helpers";
import { findByID, findOneAndUpdate } from "../utils/db";

export const postDevice = (req, res, next) => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deviceEntry = findOneAndUpdate(req.body);
    res.json({ data: deviceEntry });
  } catch (error) {
    next(error);
  }
};

export const getDevice = (req, res, next) => {
  try {
    const device = findByID(req.params.deviceId);

    if (!device) {
      return res.status(404).json({
        data: {
          message: "Device not found",
        },
      });
    }

    res.json({ data: device });
  } catch (error) {
    next(error);
  }
};

export const getDeviceLatestReading = (req, res, next) => {
  try {
    const device = findByID(req.params.deviceId);

    if (!device) {
      return res.status(404).json({
        data: {
          message: "Device not found",
        },
      });
    }

    const latestReading = getLatestReading(device.readings);

    res.json({ latest_timestamp: latestReading.timestamp });
  } catch (error) {
    next(error);
  }
};

export const getDeviceCumulativeReadingCount = (req, res, next) => {
  try {
    const device = findByID(req.params.deviceId);

    if (!device) {
      return res.status(404).json({
        data: {
          message: "Device not found",
        },
      });
    }

    const cumulativeCount = getCumulativeReadingCount(device.readings);

    res.json({ cumulative_count: cumulativeCount });
  } catch (error) {
    next(error);
  }
};
