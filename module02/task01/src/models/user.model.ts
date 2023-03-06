import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { PassThrough } from "stream";
import { users } from "../constants/users";
import { sequelize } from "../sequelize/sequelize";
import { Group } from "./group.model";
import { UserGroup } from "./userGroup.model";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare login: string;
  declare password: string;
  declare age: number;
  declare isDeleted?: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "users",
  }
);

/**
 * comments it after schema sync finished
 */
(async () => {
  try {
    await User.sync({ force: true });
    await User.bulkCreate(users);
    User.belongsToMany(Group, { through: "UserGroup" });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
