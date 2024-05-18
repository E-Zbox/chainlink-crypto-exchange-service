import { NextFunction, Request, Response } from "express";
// api
import { getGlobalCryptoMetrics } from "../api";

export const getGlobalCryptoMetricsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getGlobalCryptoMetrics();

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
