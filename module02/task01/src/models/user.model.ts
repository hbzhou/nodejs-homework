import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { users } from "../constants/users";
import { sequelize } from "../sequelize/sequelize";

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

(async () => {
  try {
    await User.sync({ force: true });
    await User.bulkCreate(users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
