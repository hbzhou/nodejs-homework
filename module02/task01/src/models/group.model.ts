import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
  declare id: CreationOptional<String>;
  declare name: string;
  declare permissions: Array<Permission>;
}

Group.init(
  {
    id: {
      type: DataTypes.STRING,
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

(async () => {
  try {
    await Group.sync({ force: true });
    console.log("The table for the Group model was just (re)created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
