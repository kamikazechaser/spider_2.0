/**
 * Spider Task 2
 * Mohamed Sohail
 */

const models = require("../models");

exports = module.exports = {
    usersController: (req, res) => {
        models.User.findAll().then(users => {
            res.status(200).json(users);
        });
    }
}