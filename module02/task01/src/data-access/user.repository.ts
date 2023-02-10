import User from "../models/user.model";

export async function save(user: User) {
  return await User.create(user);
}
