const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const prodectRouter = require("./routes/prodect");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");
const favRouter = require("./routes/fav");

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/role", rolesRouter);
app.use("/product", prodectRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/fav", favRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
