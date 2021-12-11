const {Model,DataTypes, Sequelize} = require("sequelize");

const USERS_TABLE = "users";

const UsersSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },  
    username: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    image_url: {
        allowNull: true,
        type: DataTypes.STRING
    }
    
}

class User extends Model{
    static associate(models){
        this.hasMany(models.Compra,{
            as: "compras",
            foreignKey: "idUser"
        })

    }
    static config(sequelize){
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: "User",
            timestamps: false
        }
    }
}
module.exports = {USERS_TABLE, UsersSchema, User};