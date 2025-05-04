const mongoose = require("mongoose");
const favSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  favProdects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prodect" }],
});

module.exports = mongoose.model("Fav", favSchema);
