const Product = require('../models/product'); // Assuming you have a Product model

// Controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const newProduct = new Product({ name, price, description, category, image });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Controller to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
