const { Model, DataTypes, Sequelize } = require('sequelize');
const { COMPRAS_TABLE } = require('./compras.model');
const { PRODUCTS_TABLE } = require('./product.model');

const COMPRA_PRODUCTO_TABLE = 'compras_productos';

const CompraProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  compraId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPRAS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  }
}

class CompraProducto extends Model {

  static associate() {
    
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_PRODUCTO_TABLE,
      modelName: 'CompraProducto',
      timestamps: false
    }
  }
}

module.exports = { CompraProducto, CompraProductoSchema, COMPRA_PRODUCTO_TABLE };