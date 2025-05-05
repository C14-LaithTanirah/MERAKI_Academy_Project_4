const express = require("express");
const {
  createcategory,
  getAllcategory,
  deletecategory,
} = require("../controllers/category");

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

// define router
const categoryRouter = express.Router();
categoryRouter.post(
  "/create",
  authentication,
  authorization("R"),
  createcategory
);
categoryRouter.get("/", authentication, authorization("R"), getAllcategory);
categoryRouter.delete(
  "/:id/delete",
  authentication,
  authorization("R"),
  deletecategory
);

module.exports = categoryRouter;
