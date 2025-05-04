const express = require("express");

// Import roles controller
const { createRole } = require("../controllers/roles");

// Create roles router
const rolesRouter = express.Router();

rolesRouter.post("/", createRole);

module.exports = rolesRouter;
