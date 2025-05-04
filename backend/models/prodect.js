const mongoose = require("mongoose");
const prodectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  size: [{ type: String, required: true }],
});

module.exports = mongoose.model("Prodect", prodectSchema);
