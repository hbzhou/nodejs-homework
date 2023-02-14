import { Group } from "../models/group.model";

export function findAll() {
  return Group.findAll();
}

export function findById(id: string) {
  return Group.findByPk(id);
}

export function create(group: Group) {
  return Group.create(group);
}
