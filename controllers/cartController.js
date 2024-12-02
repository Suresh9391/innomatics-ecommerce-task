const Cart = require('../models/cart');
const Product = require('../models/product');

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Find cart by user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if product is already in cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex >= 0) {
            // Update quantity if product already in cart
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex < 0) return res.status(404).json({ message: 'Product not in cart' });

        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

module.exports = { addItemToCart, getCart, removeItemFromCart };
