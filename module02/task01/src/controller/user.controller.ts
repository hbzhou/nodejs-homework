import { Request, Response } from "express";
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation";
import { findAll, findById, queryBy, save } from "../data-access/user.repository";
import { deleteByUserId } from "../data-access/userGroup.repository";
import { User } from "../models/user.model";

interface CreateUserRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
  };
}

interface UpdateUserRequest extends CreateUserRequest {
  [ContainerTypes.Body]: {
    id: number;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
  };
}

export async function getUsers(_: Request, response: Response) {
  const userList = await findAll();
  response.json(userList.filter((user) => !user.isDeleted));
}

export async function getUserById(request: Request, response: Response) {
  const id = request.params.id;
  const user = await findById(Number.parseInt(id));
  if (!user) {
    response.status(401).json({
      error: "user not found",
    });
  }
  response.json(user);
}

export async function createUser(request: ValidatedRequest<CreateUserRequest>, response: Response) {
  const createUserReq = request.body;
  const user = await save(createUserReq as User);
  response.status(201).json(user);
}

export async function updateUser(request: ValidatedRequest<UpdateUserRequest>, response: Response) {
  const updateUserRequest = request.body;
  console.log(updateUserRequest);
  const user = await findById(updateUserRequest.id);
  if (!user) {
    throw new Error("user not found");
  }
  user.login = updateUserRequest.login;
  user.password = updateUserRequest.password;
  user.age = updateUserRequest.age;
  user.isDeleted = updateUserRequest.isDeleted;
  console.log(user);
  return response.status(201).json(await user.save());
}

export async function deleteUser(request: Request, response: Response) {
  const id = request.params.id;
  const user = await findById(Number.parseInt(id));
  if (!user) {
    throw new Error("user not found");
  }
  user.isDeleted = true;
  const deletedUser = await user.save();
  await deleteByUserId(deletedUser.id);
  return response.status(200).json(deletedUser);
}

export async function getAutoSuggestUsers(request: Request, response: Response) {
  const loginSubStr = request.query.loginSubStr as string;
  const limit = parseInt(request.query.limit as string);
  console.log(loginSubStr, limit);
  const users = await queryBy(loginSubStr, limit);
  return response.status(200).json(users);
}
