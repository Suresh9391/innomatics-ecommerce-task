const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/orderController'); // Ensure correct import

// Protected Route: Create Order (Requires Authentication)
router.post('/', protect, createOrder);

// Protected Route: Get User Orders (Requires Authentication)
router.get('/myorders', protect, getUserOrders);

// Admin Route: Get All Orders (Requires Authentication and Admin Role)
router.get('/admin', protect, isAdmin, getAllOrders); // Ensure correct function is used here

module.exports = router;
