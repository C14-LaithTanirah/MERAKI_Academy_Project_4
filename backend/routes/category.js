const express = require("express");
const {
  createcategory,
  getAllcategory,
  deletecategory,
  getCategoryById,
} = require("../controllers/category");

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

// define router
const categoryRouter = express.Router();
categoryRouter.post(
  "/create",
  authentication,
  authorization("W"),
  createcategory
);
categoryRouter.get("/", authentication, authorization("R"), getAllcategory);
categoryRouter.get("/:id", authentication, authorization("R"), getCategoryById);
categoryRouter.delete(
  "/:id/delete",
  authentication,
  authorization("D"),
  deletecategory
);

module.exports = categoryRouter;
