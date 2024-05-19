import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { join } from "path";
// config
config({ path: join(__dirname, "../.env") });

// routes
import routes from "./routes";

const { PORT } = process.env;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let response = {
    data: null,
    error: "",
    success: false,
  };

  response.error = `${err}`;

  return res.status(statusCode).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
