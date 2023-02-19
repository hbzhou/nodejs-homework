import { UserGroup } from "../models/userGroup.model";

export function saveUserGroups(userGroups: UserGroup[]) {
  return UserGroup.bulkCreate(userGroups);
}
