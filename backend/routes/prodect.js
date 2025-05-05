const express = require("express");
const {
  getProdectById,
  getAllProdects,
  createProdect,
  updateProdect,
  deleteProdect,
} = require("../controllers/prodect");

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

// define router
const prodectRouter = express.Router();
prodectRouter.post(
  "/create",
  authentication,
  authorization("R"),
  createProdect
);
prodectRouter.get("/", authentication, authorization("R"), getAllProdects);
prodectRouter.get("/:id", authentication, authorization("R"), getProdectById);
prodectRouter.put(
  "/:id/update",
  authentication,
  authorization("R"),
  updateProdect
);
prodectRouter.delete(
  "/:id/delete",
  authentication,
  authorization("R"),
  deleteProdect
);

module.exports = prodectRouter;
