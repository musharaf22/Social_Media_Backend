import express, { Request, Response } from "express";
import connDb from "./config/db";
import dotenv from "dotenv";

const app = express();
connDb();
app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Server Is Running On Prot 8080</h2>");
});
app.listen(8080, () => {
  console.log("Server Is running On Port 8080");
});
