import express from "express";
import morgan from "morgan";
import router from "./router";

const app = express();

// we use morgan to handle logging
app.use(morgan("dev"));
// Allow the client to send json (bodyParser)
app.use(express.json());
// properly decode/encode query string
app.use(express.urlencoded({ extended: true }));

/**
 * This pattern gives flexibility to have multiple API version running in parallel
 * For this exercise , all the endpoints in the project requirements are in router.
 *
 * NOTE: For the sake of simplicity we don't protect those endpoints.
 *  This should never go to production without an auth middleware to grant access to read/write device readings
 *  With a middleware it would have looked like this:
 *  app.use("/v1/devices", protect, router);
 */
app.use("/v1/devices", router);

export default app;
