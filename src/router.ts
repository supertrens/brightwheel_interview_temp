import { Router } from "express";
import { postDevice } from "./handlers/devices";
import { postDeviceValidation } from "./utils/validation";

const deviceRouter = Router();

deviceRouter.post("/", ...postDeviceValidation, postDevice);

export default deviceRouter;
