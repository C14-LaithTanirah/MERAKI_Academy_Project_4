const express = require("express");
const {
  getProdectByName,
  getAllProdects,
  createProdect,
  updateProdect,
  deleteProdect,
  getProdectById,
} = require("../controllers/prodect");

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

// define router
const prodectRouter = express.Router();
prodectRouter.post(
  "/create",
  authentication,
  authorization("W"),
  createProdect
);
prodectRouter.get("/", authentication, authorization("R"), getAllProdects);
prodectRouter.get(
  "/:title",
  authentication,
  authorization("R"),
  getProdectByName
);
prodectRouter.get(
  "/id/:id",
  authentication,
  authorization("R"),
  getProdectById
);
prodectRouter.put(
  "/:id/update",
  authentication,
  authorization("U"),
  updateProdect
);
prodectRouter.delete(
  "/:id/delete",
  authentication,
  authorization("D"),
  deleteProdect
);

module.exports = prodectRouter;
