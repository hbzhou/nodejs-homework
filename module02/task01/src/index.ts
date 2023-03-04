import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.router";
import groupRouter from "./routes/group.router";
import userGroupRouter from "./routes/userGroup.router";
import authRouter from "./routes/auth.router";
import { checkToken } from "./middleware/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "localhost:4000",
    methods: "*",
  })
);
app.use(json());
app.use(checkToken);
app.use("", authRouter);
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/userGroups", userGroupRouter);

app.get("/", (_: Request, response: Response) => {
  response.send("hello, express server ....");
});

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}...`);
});
