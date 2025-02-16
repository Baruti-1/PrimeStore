import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.CartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.CartItems.push(productId);
    }

    await user.save();
    res.json(user.CartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
