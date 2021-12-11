const {Model,DataTypes, Sequelize} = require("sequelize");
const { PRODUCTS_TABLE } = require("./product.model");
const { USERS_TABLE } = require("./user.model");

const COMPRAS_TABLE = "compras";

const ComprasSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USERS_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        ondDelete: "SET NULL",
    }
}

class Compra extends Model{
    static associate(models){
        this.belongsTo(models.User,{
            as: "comprador",
            foreignKey: "idUser"
        });
        this.belongsToMany(models.Product,{
            as: "items",
            through: models.CompraProducto,
            foreignKey: "compraId",
            otherKey: "productId"
        });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: COMPRAS_TABLE,
            modelName: "Compra",
            timestamps: false
        }
    }
}
module.exports = {COMPRAS_TABLE, ComprasSchema, Compra};