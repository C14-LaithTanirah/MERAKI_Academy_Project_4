const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartProdects: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Prodect" },
      count: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
