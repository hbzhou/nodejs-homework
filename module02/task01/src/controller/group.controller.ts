import { Request, Response } from "express";
import { create, findAll, findById } from "../data-access/group.repository";
import { deleteByGroupId } from "../data-access/userGroup.repository";
import { Group } from "../models/group.model";

export async function getGroups(_: Request, response: Response) {
  const groups = await findAll();
  response.status(200).json(groups);
}

export async function getGroupById(request: Request, response: Response) {
  const id = request.params.id;
  const group = await findById(id);
  response.status(200).json(group);
}

export async function createGroup(request: Request<Group>, response: Response) {
  const group = await create(request.body as Group);
  response.status(200).json(group);
}

export async function updateGroup(request: Request<Group>, response: Response) {
  const requestDto = request.body as Group;
  const group = await findById(requestDto.id);
  if (!group) {
    throw new Error("Group Not Found");
  }
  group.name = requestDto.name;
  group.permissions = requestDto.permissions;
  const updatedGroup = await group.save();
  response.status(200).json(updatedGroup);
}

export async function deleteGroup(request: Request, response: Response) {
  const id = request.params.id;
  const group = await findById(id);
  if (!group) {
    throw new Error("Group Not Found");
  }
  await deleteByGroupId(group.id);
  await group.destroy();
  response.sendStatus(200);
}
