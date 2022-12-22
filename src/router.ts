import { Router } from "express";
import {
  getDevice,
  getDeviceLatestReading,
  postDevice,
} from "./handlers/devices";
import { postDeviceValidation } from "./utils/validation";

const deviceRouter = Router();

deviceRouter.post("/", ...postDeviceValidation, postDevice);
deviceRouter.get("/:deviceId", getDevice);
deviceRouter.get("/:deviceId/latest", getDeviceLatestReading);

export default deviceRouter;
