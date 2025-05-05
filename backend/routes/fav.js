const express = require("express");
const {
  createfav,
  getfavByUserId,
  deletefav,
  updatefav,
} = require("../controllers/fav");
const authentication = require("../middleware/authentication");


const favRouter = express.Router();
favRouter.post("/create",authentication, createfav);
favRouter.get("/:id",authentication, getfavByUserId);
favRouter.delete("/:id/delete",authentication, deletefav);
favRouter.put("/:id/update",authentication, updatefav);

module.exports = favRouter;
