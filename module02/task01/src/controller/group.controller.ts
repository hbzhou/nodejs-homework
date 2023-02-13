import { Request, Response } from "express";
import { findAll } from "../data-access/group.repository";

export async function getGroups(_: Request, response: Response) {
  const groups = await findAll();
  response.status(200).json(groups);
}
