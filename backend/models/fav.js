const mongoose = require("mongoose");
const favSchema = new mongoose.Schema({
  favProdects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prodect" }],
});

module.exports = mongoose.model("Fav", favSchema);
