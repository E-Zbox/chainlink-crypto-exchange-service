import express from "express";
// controllers
import {
  getGlobalCryptoMetricsController,
  getHealthCheck,
} from "../controllers";

const Router = express.Router();

Router.get("/", getHealthCheck);
Router.get("/global-metrics/quotes/latest", getGlobalCryptoMetricsController);

export default Router;
