const express = require("express");
const {
  getProdectById,
  getAllProdects,
  createProdect,
  updateProdect,
  deleteProdect,
} = require("../controllers/prodect");

// define router
const prodectRouter = express.Router();
prodectRouter.post("/create", createProdect);
prodectRouter.get("/", getAllProdects);
prodectRouter.get("/:id", getProdectById);
prodectRouter.put("/:id/update", updateProdect);
prodectRouter.delete("/:id/delete", deleteProdect
);

module.exports = prodectRouter;
