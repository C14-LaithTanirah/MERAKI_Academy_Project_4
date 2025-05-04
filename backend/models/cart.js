const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  cartProdects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prodect" }],
});

module.exports = mongoose.model("Cart", cartSchema);
