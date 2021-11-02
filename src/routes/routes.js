const router = require('express').Router()

const PlayerController = require('../controllers/players')

//router.get('/products/:id?', ProductiController.get)
//router.post('/products', ProductiController.post)
//router.put('/products/:id', ProductiController.put)
//router.delete('/products/:id',ProductiController.remove)

router.get('/players/:email?', PlayerController.get)

router.post('/',PlayerController.test)
router.post('/enter_arena/:email', PlayerController.findArena)


module.exports = router