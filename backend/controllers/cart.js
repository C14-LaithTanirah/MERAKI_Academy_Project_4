const cartModel = require("../models/cart");

const createcart = (req, res) => {
  const { userId } = req.body;
  const cart = new cartModel({
    userId,
  });

  cart
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `cart Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getCartByUserId = (req, res) => {
  cartModel
    .find({ userId: req.params.id })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `cart By ${req.params.id}`,
        author: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deletecart = (req, res) => {
  const id = req.params.id;
  cartModel
    .findOneAndDelete({ userId: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The cart with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `cart deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updatecart = (req, res) => {
  cartModel
    .findOneAndUpdate(
      { userId: req.params.id },
      { cartProdects: req.body.cartProdects },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The cart with UserId => ${req.params.id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `cart updated`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createcart,
  getCartByUserId,
  deletecart,
  updatecart,
};
