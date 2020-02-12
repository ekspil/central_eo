const Sequelize = require("sequelize")

const Sale = {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    restoran: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    pin: {
        type: Sequelize.DataTypes.STRING
    },
    text: {
        type: Sequelize.DataTypes.STRING
    },
    extId: {
        type: Sequelize.DataTypes.STRING
    },
    payType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: false
    },
    sendToEO: {
        type: Sequelize.DataTypes.BOOLEAN,
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

module.exports = Sale
