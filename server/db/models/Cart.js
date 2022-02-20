const Sequelize = require('sequelize')
const db = require('../db')
module.exports = db.define('cart', {

    //true = yes currently in progress
    //false = completed order
    inProgress: {
        type: Sequelize.BOOLEAN,
        validate: {
            notEmpty: true
        },
        allowNull:false,
        defaultValue: true
    }

})
