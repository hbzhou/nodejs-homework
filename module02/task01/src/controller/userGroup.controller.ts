import { Request, Response } from "express";
import { userInfo } from "os";
import { Transaction } from "sequelize";
import { save } from "../data-access/user.repository";
import { saveUserGroups } from "../data-access/userGroup.repository";
import { UserGroup } from "../models/userGroup.model";
import { sequelize } from "../sequelize/sequelize";

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
  const result = await sequelize.transaction(async (t: Transaction) => {
    return await saveUserGroups(userGroups, t);
  });
  response.status(200).json(result);
}
