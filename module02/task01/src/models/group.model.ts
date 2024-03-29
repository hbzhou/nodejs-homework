import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../sequelize/sequelize";
import { User } from "./user.model";

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare permissions: Array<Permission>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "groups",
  }
);

/**
 * comments it after schema sync finished
 */

(async () => {
  try {
    await Group.sync({ force: true });
    Group.belongsToMany(User, { through: "UserGroup" });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
