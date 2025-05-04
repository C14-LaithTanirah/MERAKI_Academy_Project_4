const favModel = require("../models/fav");

const createfav = (req, res) => {
  const { userId } = req.body;
  const fav = new favModel({
    userId,
  });

  fav
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `favorite Created Successfully`,
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

const getfavByUserId = (req, res) => {
  favModel
    .find({ userId: req.params.id })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `favorite By ${req.params.id}`,
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

const deletefav = (req, res) => {
  const id = req.params.id;
  favModel
    .findOneAndDelete({ userId: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The favorite with userId => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `favorite deleted`,
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

const updatefav = (req, res) => {
  favModel
    .findOneAndUpdate(
      { userId: req.params.id },
      { favProdects: req.body.favProdects },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The favorite with UserId => ${req.params.id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `favorite updated`,
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
  createfav,
  getfavByUserId,
  deletefav,
  updatefav,
};
