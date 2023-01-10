import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";

import userRouter from "./routes/user.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(json());
app.use("/users", userRouter);

app.get("/", (_: Request, response: Response) => {
  response.send("hello, express server ....");
});

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}...`);
});
