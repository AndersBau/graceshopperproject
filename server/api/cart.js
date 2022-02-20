const router = require("express").Router();

const { user } = require("pg/lib/defaults");
const Cart = require("../db/models/Cart");
const CartItem = require("../db/models/CartItem");
const Product = require("../db/models/Product");
const User = require("../db/models/User");

const hasToken = async (req, res, next) => {

  const user = await User.findByToken(req.headers.authorization);
  if(user) {
    req.user = user;
    next()
   } else {
     next( new Error('User is not logged in'));
   }
  }


//Route for when user clicks his/her cart
//price, name, quantity
router.get("/", hasToken, async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        inProgress: true,
      },
      include: [
        {
          model: Product,
        },
      ],
    });


    // const products = await cart.getProducts();
    // let currentCart = [];
    // for (let i = 0; i < products.length; i++) {
    //   currentCart.push({
    //     userId: cart.userId,
    //     cartId: cart.id,
    //     productId: products[i].dataValues.id,
    //     name: products[i].dataValues.name,
    //     imageUrl: products[i].dataValues.imageUrl,
    //     price: products[i].dataValues.price,
    //     description: products[i].dataValues.description,
    //     productType: products[i].dataValues.productType,
    //     quantity: products[i].dataValues.cartItem.quantity,
    //   });
    // }
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:productId", hasToken, async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        inProgress: true,
      }
    });
    const cartItems = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.params.productId,
      },
    });
    await cartItems.destroy();
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", hasToken, async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        inProgress: true,
      }
    });
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.params.productId,
      },
    });
    await cartItem.update({
      quantity: req.body.quantity,
    });
    res.send(cartItem);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/:cartId/:productId", async (req, res) => {
//   try {
//     const cart = await Cart.findByPk(req.params.cartId);

//     const cartItem = await CartItem.findOne({
//       where: {
//         cartId: cart.id,
//         productId: req.params.productId,
//       },
//     });
//     //First need to check if item is already in cart. If it is, add to the quantity.
//     if (cartItem) {
//       res.send(
//         await cartItem.update({
//           quantity: cartItem.quantity+1,
//         })
//       );
//     // Else, create a new CartItem
//     } else {
//       let newCartItem = await CartItem.create({
//         quantity: 1,
//         productId: req.params.productId,
//         cartId: req.params.cartId,
//       });
//       res.send(await newCartItem);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


router.get("/checkout", hasToken, async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        inProgress: true,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.put("/checkout", hasToken, async (req, res) => {
  console.log('////////////Hello from PUT ROUTE')
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        inProgress: true,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    cart.update({ inProgress: false })
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
