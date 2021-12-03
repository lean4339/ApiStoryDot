const { Sequelize } = require("sequelize");
const  config  = require("../config/config");
const setupModels = require("../DB/models");
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = config.dbUrl;
const sequelize = new Sequelize(URI,{
    dialect: "postgres",
    logging: false,
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
setupModels(sequelize);
sequelize.sync();
module.exports = sequelize;