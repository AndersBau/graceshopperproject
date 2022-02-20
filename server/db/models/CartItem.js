const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./Product')
const Cart = require('./Cart')

module.exports = db.define('cartItem', {

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        defaultValue: 0
    },

    // priceAtCheckout: {
    //     type: Sequelize.INTEGER,
    //     validate: {
    //         notEmpty:true
    //     },
    //     allowNull: false,
    //     defaultValue: 0 ,
    //     // will be solidified at checkout and can never change after checkout
    //     // if Cart.inProgress = 0, then this will be populated with the price at that point and will never change

    // },

})