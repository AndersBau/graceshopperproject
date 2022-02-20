const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    imageUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl:true
        },
        defaultValue:"https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg-300x248.jpg"
    },


    price: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty:true
        },
        allowNull: false,
        defaultValue:10
    },

    description: {
        type: Sequelize.STRING,
        validate: {
            notEmpty:true,
        },
        allowNull:false
    },

    productType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});
