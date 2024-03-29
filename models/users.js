const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Users = sequelize.define('users',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
    },

    ispremiumuser: Sequelize.BOOLEAN,

    totalExpenses:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }

})

module.exports = Users;