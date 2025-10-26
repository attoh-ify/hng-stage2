import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(config.databaseUrl, {
    dialect: "mysql",
    logging: false
});

export { sequelize };
