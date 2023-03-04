import { Request, Response } from "express";
import { findByLogin } from "../data-access/user.repository";
import Jwt from "jsonwebtoken";

type LoginReqDto = {
  username: string;
  password: string;
};

export async function login(request: Request<null, null, LoginReqDto, null>, response: Response) {
  const reqDto = request.body;
  const user = await findByLogin(reqDto.username);
  if (!user || user.password !== reqDto.password) {
    return response.status(401).json({
      message: "Bad username/password combination.",
    });
  }
  const token = Jwt.sign({ ...reqDto }, "secret", { expiresIn: "2h" });
  return response.status(200).json(token);
}
