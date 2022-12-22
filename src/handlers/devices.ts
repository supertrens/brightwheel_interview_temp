import { validationResult } from "express-validator";
import { findOneAndUpdate } from "../utils/db";

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
