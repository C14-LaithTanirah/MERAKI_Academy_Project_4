const express = require("express");
const {
  createcategory,
  getAllcategory,
  deletecategory,
} = require("../controllers/category");

// define router
const categoryRouter = express.Router();
categoryRouter.post("/create", createcategory);
categoryRouter.get("/", getAllcategory);
categoryRouter.delete("/:id/delete", deletecategory);

module.exports = categoryRouter;
