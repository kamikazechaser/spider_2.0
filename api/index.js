/**
 * Spider Task 2
 * Mohamed Sohail
 */

const express = require("express");

const router = express.Router();
const api = require("./endpoints");

router.get("/users", api.usersController);

exports = module.exports = router;