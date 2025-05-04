const express = require("express");
const {
  createcart,
  getCartByUserId,
  deletecart,
  updatecart,
} = require("../controllers/cart");

// define router
const cartRouter = express.Router();
cartRouter.post("/create", createcart);
cartRouter.get("/:id", getCartByUserId);
cartRouter.delete("/:id/delete", deletecart);
cartRouter.put("/:id/update", updatecart);

module.exports = cartRouter;
