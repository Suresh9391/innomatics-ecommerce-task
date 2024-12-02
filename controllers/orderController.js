const Order = require('../models/order');
const Product = require('../models/product');

// Create new order
const createOrder = async (req, res) => {
    const { products } = req.body; // Only products are sent in request body (userId can be extracted from JWT token)

    try {
        // Calculate total amount for the order
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
            totalAmount += product.price * item.quantity; // Price calculation based on product and quantity
        }

        // Create the order
        const order = new Order({
            userId: req.user.id, // Extract userId from JWT token (protected route)
            products,
            totalAmount
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    const { userId } = req.user; // UserId is taken from the JWT token, not from route params.

    try {
        const orders = await Order.find({ userId }); // Fetch orders for the authenticated user
        if (orders.length === 0) return res.status(404).json({ message: 'No orders found' });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Admin route: Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders (for admins)
        if (orders.length === 0) return res.status(404).json({ message: 'No orders found' });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all orders', error });
    }
};

module.exports = { createOrder, getUserOrders, getAllOrders };
