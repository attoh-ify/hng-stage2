import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(config.MYSQL_PUBLIC_URL, {
    dialect: "mysql",
    logging: false
});

export { sequelize };
