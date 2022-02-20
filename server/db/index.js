//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const SuperHero = require("./models/SuperHero");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");

//associations could go here!

//One-to-Many
SuperHero.hasMany(Product);
Product.belongsTo(SuperHero);

//Many-to-Many
Cart.belongsToMany(Product, {
  through: {
    model: CartItem,
  },
});

Product.belongsToMany(Cart, {
  through: {
    model: CartItem,
  },
});

//One-to-Many
// CartItem.belongsTo(Cart);
// Cart.hasMany(CartItem);

// One-to-Many
Cart.belongsTo(User);
User.hasMany(Cart);

//CREATE OUR METHODS
User.getCart = async function () {
  const cart = await User.findAll({
    include: [
      {
        model: Cart,
      },
    ],
  });
  return cart;
};

Cart.getItems = async function () {
  const items = await Cart.findAll({
    include: [
      {
        model: CartItem,
      },
    ],
  });
  return items;
};

//===================================

module.exports = {
  db,
  models: {
    User,
    SuperHero,
    Product,
    Cart,
    CartItem,
  },
};
