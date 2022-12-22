import { Router } from "express";
import {
  getDevice,
  getDeviceCumulativeReadingCount,
  getDeviceLatestReading,
  postDevice,
} from "./handlers/devices";
import { postDeviceValidation } from "./utils/validation";

const deviceRouter = Router();

deviceRouter.post("/", ...postDeviceValidation, postDevice);
deviceRouter.get("/:deviceId", getDevice);
deviceRouter.get("/:deviceId/latest", getDeviceLatestReading);
deviceRouter.get("/:deviceId/cumulative", getDeviceCumulativeReadingCount);

// TODO: inspect the error to set proper message and status
deviceRouter.use((err, _req, res, _next) => {
  res.status(500);
  res.json({ error: err });
});

export default deviceRouter;
