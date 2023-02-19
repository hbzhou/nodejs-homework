import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../sequelize/sequelize";
import { Group } from "./group.model";
import { User } from "./user.model";

export class UserGroup extends Model<InferAttributes<UserGroup>, InferCreationAttributes<UserGroup>> {
  declare id: CreationOptional<string>;
  declare userId: number;
  declare groupId: string;
}

UserGroup.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "UserId",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Group,
        key: "GroupId",
      },
    },
  },
  { sequelize, tableName: "user_group" }
);

UserGroup.belongsTo(User, { foreignKey: "UserId" });
UserGroup.belongsTo(Group, { foreignKey: "GroupId" });

// (async () => {
//   try {
//     await UserGroup.sync({ force: true });
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();
