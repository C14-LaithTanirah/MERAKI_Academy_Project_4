const prodectModel = require("../models/prodect");

const createProdect = (req, res) => {
  const { title, description, img, price, size } = req.body;
  const prodect = new prodectModel({
    title,
    description,
    img,
    price,
    size,
  });

  prodect
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Prodect Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllProdects = (req, res) => {
  prodectModel
    .find({})
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `All prodect`,
        author: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const getProdectById = (req, res) => {
  prodectModel
    .find({ _id: req.params.id })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `prodect By ${req.params.id}`,
        author: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateProdect = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  prodectModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newprodect) => {
      if (!newprodect) {
        return res.status(404).json({
          success: false,
          message: `The prodect with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `prodect updated`,
        article: newprodect,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteProdect = (req, res) => {
  const id = req.params.id;
  prodectModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The prodect with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `prodect deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  getProdectById,
  getAllProdects,
  createProdect,
  updateProdect,
  deleteProdect,
};
