const express = require("express");
const {
  createcart,
  getCartByUserId,
  deletecart,
  updatecart,
} = require("../controllers/cart");
const authentication = require("../middleware/authentication");

// define router
const cartRouter = express.Router();
cartRouter.post("/create",authentication, createcart);
cartRouter.get("/:id",authentication, getCartByUserId);
cartRouter.delete("/:id/delete",authentication, deletecart);
cartRouter.put("/:id/update",authentication, updatecart);

module.exports = cartRouter;
