const express = require("express");
const {
  createfav,
  getfavByUserId,
  deletefav,
  updatefav,
} = require("../controllers/fav");

// define router
const favRouter = express.Router();
favRouter.post("/create", createfav);
favRouter.get("/:id", getfavByUserId);
favRouter.delete("/:id/delete", deletefav);
favRouter.put("/:id/update", updatefav);

module.exports = favRouter;
