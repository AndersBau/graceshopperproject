"use strict";

const {
  db,
  models: { User, Product, SuperHero, CartItem, Cart },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      fName: "John",
      lName: "Smith",
      email: "john123@gmail.com",
      address: "3578 Audry St Zip code 11587, Brooklyn NY",
      username: "jsmith",
      password: "123",
    }),
    User.create({
      fName: "Jane",
      lName: "Doe",
      email: "jane123@gmail.com",
      address: "555 Some Rd 10000, Somewhere, NJ",
      username: "jdoe",
      password: "123",
    }),
  ]);

  const superHeros = await Promise.all([
    SuperHero.create({
      name: "Superman",
      imageUrl:
        "https://static.wikia.nocookie.net/marvel_dc/images/4/4b/Batman_Vol_3_86_Textless.jpg/revision/latest?cb=20200502132734",
    }),
    SuperHero.create({
      name: "Batman",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/TEXaW-u76LZwYGT_VzmuhCoF52s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22802887/IMG_DE272BF718E8_1.jpeg",
    }),
    SuperHero.create({
      name: "Captain America",
      imageUrl:
        "https://static.wikia.nocookie.net/avengers-assemble/images/e/ea/Revo-Cap.png/revision/latest/scale-to-width-down/1200?cb=20170615073447",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Superman Poster 1",
      imageUrl:
        "https://i5.walmartimages.com/asr/5a188d93-e9e6-4433-8b50-1cd27a5ed4b6_1.bba57e1dbcf9f3053b5dc17a1a34a8bc.jpeg",
      price: 20,
      description: "Superman punching air (animated)",
      superheroId: 1,
      productType: "Poster",
    }),
    Product.create({
      name: "Superman Poster 2",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5hYySpdXKJswheCHfI493nTQHfQOlaYqd0Nxnj1gWzDb8IbuI_v8gVoUmcdX66TickqM&usqp=CAU",
      price: 21,
      description: "Superman Man of Steel",
      superheroId: 1,
      productType: "Poster",
    }),
    Product.create({
      name: "Batman Poster 1",
      imageUrl:
        "https://m.media-amazon.com/images/I/61mmmZnhBxL._AC_SL1000_.jpg",
      price: 20,
      description: "Batman walking with fists (animated)",
      superheroId: 2,
      productType: "Poster",
    }),
    Product.create({
      name: "Batman Poster 2",
      imageUrl:
        "https://i5.walmartimages.com/asr/0023798d-3a69-44ff-9bf5-295e7a8606d4_1.b953cdc77ead8b12b7e46864336ff641.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      price: 23,
      description: "Batman movie 1989",
      superheroId: 2,
      productType: "Poster",
    }),
    Product.create({
      name: "Captain America Poster 1",
      imageUrl:
        "https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/3/captain-america-thomas-pollart.jpg",
      price: 20,
      description: "Captain America Poster by Thomas Pollart",
      superheroId: 3,
      productType: "Poster",
    }),
    Product.create({
      name: "Captain America Poster 2",
      imageUrl:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Furl%3Dhttps%253A%252F%252Fstatic.onecms.io%252Fwp-content%252Fuploads%252Fsites%252F6%252F2011%252F06%252Fcaptain_america_poster_510.jpg&q=85",
      price: 23,
      description: "Captain America The First Avenger movie poster",
      superheroId: 2,
      productType: "Poster",
    }),
  ]);

  const carts = await Promise.all([
    Cart.create({ userId: 1, inProgress: true }),
    Cart.create({ userId: 2, inProgress: false }),
  ]);

  const cartItems = await Promise.all([
    CartItem.create({
      quantity: 2,
      //priceAtCheckout: 20,
      productId: 1,
      cartId: 1,
    }),
    CartItem.create({
      quantity: 1,
      //priceAtCheckout: 20,
      productId: 3,
      cartId: 1,
    }),
    CartItem.create({
      quantity: 1,
      //priceAtCheckout: 21,
      productId: 2,
      cartId: 2,
    }),
    CartItem.create({
      quantity: 3,
      //priceAtCheckout: 23,
      productId: 6,
      cartId: 2,
    }),
  ]);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      John: users[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
