import { Request, Response } from "express";
import { saveUserGroups } from "../data-access/userGroup.repository";
import { UserGroup } from "../models/userGroup.model";

type AddUsersToGroupDto = {
  groupId: string;
  userIds: number[];
};

export async function addUsersToGroup(req: Request<null, AddUsersToGroupDto, AddUsersToGroupDto>, response: Response) {
  const requestDto = req.body;
  const userGroups = requestDto.userIds.map((userId) => {
    return {
      userId,
      groupId: requestDto.groupId,
    } as UserGroup;
  });
  const result = await saveUserGroups(userGroups);
  response.status(200).json(result);
}
