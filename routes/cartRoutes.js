const express = require('express');
const { addItemToCart, getCart, removeItemFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addItemToCart);
router.get('/:userId', getCart);
router.delete('/:userId/:productId', removeItemFromCart);

module.exports = router;
