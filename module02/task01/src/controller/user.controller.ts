import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { users } from "../db/users.db";

type CreateUserRequest = {
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
};

type UpdateUserRequest = CreateUserRequest & { id: string };

type DeleteUserRequest = {
  id: string;
};

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

export function createUser(request: Request<never, never, CreateUserRequest, never>, response: Response) {
  const createUserReq = request.body;
  const user: User = {
    id: uuid(),
    ...createUserReq,
  };
  users.push(user);
  response.status(201).json(user);
}

export function updateUser(request: Request<never, never, UpdateUserRequest, never>, response: Response) {
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
