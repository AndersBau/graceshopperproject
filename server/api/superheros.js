const router = require('express').Router();

const SuperHero = require('../db/models/SuperHero');
router.get('/', async (req, res) => {
    try {
        const superHeros = await SuperHero.findAll();
        res.send(superHeros);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router