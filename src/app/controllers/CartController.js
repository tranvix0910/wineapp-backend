import CartModel from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { wineId, quantity } = req.body;
  try {
    let cart = await CartModel.findOne({ orderBy: userId });
    if (cart) {
      // Add the new product to the existing cart
      const producIndex = cart.products.findIndex(
        (product) => product.wine && product.wine.toString() === wineId
      );
      if (producIndex > -1) {
        cart.products[producIndex].quantity += Number(quantity);
      } else {
        cart.products.push({ wine: wineId, quantity: 1 });
      }
      await cart.save();
    } else {
      // Create a new cart for the user
      cart = new CartModel({
        products: [{ wine: wineId, quantity: 1 }],
        orderBy: userId,
      });
      await cart.save();
    }

    // Populate the products in the cart for the response
    return res.status(200).json({
      success: true,
      message: "Product has been add to cart",
      data: cart,
    });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const userId = req.user._id;
  try {
    const products = await CartModel.findOne({ orderBy: userId }).populate(
      "products.wine"
    );
    return res
      .status(200)
      .json({ success: true, message: "get success", data: products });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const increaseProduct = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    let cart = await CartModel.findOne({ orderBy: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const productIndex = cart.products.findIndex(
      (product) => product.wine && product.wine.toString() === wineId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity increased",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const decreaseProduct = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    let cart = await CartModel.findOne({ orderBy: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const productIndex = cart.products.findIndex(
      (product) => product.wine && product.wine.toString() === wineId
    );
    if (productIndex > -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }
      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Product quantity decreased or removed",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    const cart = await CartModel.findOne({ orderBy: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) => product.wine && product.wine.toString() !== wineId
    );
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user._id;
  try {
    let cart = await CartModel.findOne({ orderBy: userId });
    cart.products = [];
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "All products have been removed from the cart",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
