const Sequelize = require("sequelize")

const Item = {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    count: {
        type: Sequelize.DataTypes.INTEGER
    },
    station: {
        type: Sequelize.DataTypes.INTEGER
    },
    code: {
        type: Sequelize.DataTypes.INTEGER
    },
    price: {
        type: Sequelize.DataTypes.FLOAT
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        unique: false,
        field: "created_at"
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        unique: false,
        field: "updated_at"
    }
}
module.exports = Item
