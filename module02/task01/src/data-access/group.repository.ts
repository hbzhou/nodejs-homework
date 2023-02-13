import { Group } from "../models/group.model";

export async function findAll() {
  return Group.findAll();
}
