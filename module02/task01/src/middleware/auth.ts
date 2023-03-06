import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function checkToken(request: Request, response: Response, next: NextFunction) {
  if (request.path === "/login") {
    return next();
  }
  const token = request.headers["authorization"] as string;
  if (!token) {
    return response.status(401).send("Unauthorized");
  }
  try {
    Jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return response.status(403).send("Invalid Token");
  }
  return next();
}
