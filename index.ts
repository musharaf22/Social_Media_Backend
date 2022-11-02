import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import connDb from "./config/db";
import dotenv from "dotenv";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
dotenv.config();
connDb();
app.use("/api/v1", routes);
app.get("/", (_, res: Response) => {
  res.send("<h1>Server Is Running On Prot 8080</h2>");
});
app.listen(process.env.PORT, () => {
  console.log("Server Is running On Port", process.env.PORT);
});
