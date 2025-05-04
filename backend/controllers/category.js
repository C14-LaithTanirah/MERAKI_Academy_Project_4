const categoryModel = require("../models/category");

const createcategory = (req, res) => {
  const { categoryName, categoryProdect } = req.body;
  const category = new categoryModel({
    categoryName,
    categoryProdect,
  });

  category
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `category Created Successfully`,
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

const getAllcategory = (req, res) => {
  categoryModel
    .find({})
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `All category`,
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

const deletecategory = (req, res) => {
  const id = req.params.id;
  categoryModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The category with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `category deleted`,
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
  createcategory,
  getAllcategory,
  deletecategory,
};
