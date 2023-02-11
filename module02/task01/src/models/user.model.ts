import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { users } from "../constants/users";

const sequelize = new Sequelize("jeremy", "jeremy", "123456", {
  host: "localhost:5432",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
    await sequelize.authenticate();
    await User.sync({ force: true });
    await User.bulkCreate(users);
    console.log("The table for the User model was just (re)created!");
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    // sequelize.close();
  }
})();

export default User;
