import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres://jeremy:123456@localhost:5432/jeremy");

const User = sequelize.define(
  "Users",
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
    tableName: "users",
    timestamps: false,
  }
);

// (async () => {
//   try {
//     await sequelize.authenticate();
//     await User.sync({ force: true });
//     console.log("The table for the User model was just (re)created!");
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   } finally {
//     sequelize.close();
//   }
// })();

export default User;
