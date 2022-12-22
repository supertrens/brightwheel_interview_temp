import { Router } from "express";
import { getDevice, postDevice } from "./handlers/devices";
import { postDeviceValidation } from "./utils/validation";

const deviceRouter = Router();

deviceRouter.post("/", ...postDeviceValidation, postDevice);
deviceRouter.get("/:deviceId", getDevice);

export default deviceRouter;
