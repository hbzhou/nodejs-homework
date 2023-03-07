import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("jeremy", "jeremy", "123456", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();
