const router = require('express').Router()

const ProductiController = require('../controllers/products')


router.get('/products', ProductiController.get)


module.exports = router