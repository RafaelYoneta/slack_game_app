const router = require('express').Router()

const ProductiController = require('../controllers/products')


router.get('/products/:id?', ProductiController.get)
router.post('/products', ProductiController.post)
router.put('/products/:id', ProductiController.put)
router.delete('/products/:id',ProductiController.remove)

module.exports = router