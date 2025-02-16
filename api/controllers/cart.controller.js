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

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.CartItems = [];
    } else {
      user.CartItems = user.CartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.CartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.CartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.CartItems = user.CartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.CartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.CartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
