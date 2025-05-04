const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: { type: String ,required: true},
  categoryProdect : [{ type: mongoose.Schema.Types.ObjectId, ref: "Prodect" }],
});

module.exports = mongoose.model("Category", categorySchema);
