const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    res.status(200).send(await User.findByPk(req.params.id))
  } catch (error) {
    console.log(error);
  }
});

router.post('/add-user', async (req, res) => {
  try {
    const myUser = await User.create(req.body);
    res.status(200).send(myUser)
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const myUser = User.findByPk(req.params.id)
    res.status(200).send(await myUser.update(req.body));
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const myUser = await User.findByPk(req.params.id);
    await myUser.destroy()
  } catch (error) {
    console.log(error);
  }
})
