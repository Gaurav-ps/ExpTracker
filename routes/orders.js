const express = require('express')

const orderRoutes = require('../controllers/orders')

const router = express.Router();

router.post('/add-orders', orderRoutes.addOrders)

router.get('/get-orders', orderRoutes.getOrders)

router.delete('/delete-orders/:id', orderRoutes.deleteOrders)

module.exports = router;