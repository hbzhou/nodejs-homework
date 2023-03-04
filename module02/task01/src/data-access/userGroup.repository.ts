import { group } from "console";
import { Transaction } from "sequelize";
import { UserGroup } from "../models/userGroup.model";

export function saveUserGroups(userGroups: UserGroup[], t: Transaction) {
  return UserGroup.bulkCreate(userGroups, { transaction: t });
}

export async function deleteByUserId(userId: number) {
  UserGroup.destroy({
    where: {
      userId: userId,
    },
  });
}

export async function deleteByGroupId(groupId: string) {
  UserGroup.destroy({
    where: {
      groupId: groupId,
    },
  });
}
