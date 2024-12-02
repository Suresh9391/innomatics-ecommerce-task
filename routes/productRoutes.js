const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ensure this is the correct path

// Example route to create a product
router.post('/add', productController.createProduct);  // This is where the error is happening

// Other routes like update, delete, get products, etc.
router.get('/', productController.getProducts);

module.exports = router;
