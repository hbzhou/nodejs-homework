import { Op } from "sequelize";
import User from "../models/user.model";

export async function save(user: User) {
  return User.create(user);
}

export async function findAll() {
  return User.findAll();
}

export async function findById(id: number) {
  return User.findByPk(id);
}

export async function queryBy(loginStr: string, limit: number) {
  return User.findAll({
    where: {
      login: {
        [Op.like]: `${loginStr}%`,
      },
    },
    limit: limit,
    order: [["login", "DESC"]],
  });
}
