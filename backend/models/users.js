const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  userName: { type: String ,required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number :{type:String ,required: true},
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
