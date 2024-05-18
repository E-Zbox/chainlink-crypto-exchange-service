import express from "express";
// controllers
import { getGlobalCryptoMetricsController } from "../controllers";

const Router = express.Router();

Router.get("/global-metrics/quotes/latest", getGlobalCryptoMetricsController);

export default Router;
