import { config } from "dotenv";
import express from "express";
import { join } from "path";
// config
config({ path: join(__dirname, "../.env") });

// routes
import routes from "./routes";

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
