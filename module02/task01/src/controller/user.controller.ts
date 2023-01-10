import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { users } from "../db/users.db";
import Joi from "joi";

import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation";

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
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
  };
}

export function getUsers(_: Request, response: Response) {
  response.json(users.filter((user) => !user.isDeleted));
}

export function getUserById(request: Request, response: Response) {
  const id = request.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    response.status(401).json({
      error: "user not found",
    });
  }
  response.json(user);
}

export function createUser(request: ValidatedRequest<CreateUserRequest>, response: Response) {
  const createUserReq = request.body;
  const user: User = {
    id: uuid(),
    ...createUserReq,
  };
  users.push(user);
  response.status(201).json(user);
}

export function updateUser(request: ValidatedRequest<UpdateUserRequest>, response: Response) {
  const updateUserRequest = request.body;
  console.log(updateUserRequest);
  const index = users.findIndex((user) => updateUserRequest.id === user.id);
  if (index < 0) {
    throw new Error("user not found");
  }
  users[index].login = updateUserRequest.login;
  users[index].password = updateUserRequest.password;
  users[index].age = updateUserRequest.age;
  users[index].isDeleted = updateUserRequest.isDeleted;
  return response.status(201).json(users[index]);
}

export function deleteUser(request: Request, response: Response) {
  const id = request.params.id;
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    throw new Error("user not found");
  }
  users[index].isDeleted = true;
  return response.sendStatus(200);
}

export function getAutoSuggestUsers(request: Request, response: Response) {
  const loginSubStr = request.query.loginSubStr as string;
  const limit = parseInt(request.query.limit as string);
  const result = users
    .filter((user) => user.login.indexOf(loginSubStr) > -1)
    .sort((user1, user2) => user1.login.localeCompare(user2.login))
    .splice(0, limit);
  return response.status(200).json(result);
}
