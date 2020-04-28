const express = require("express");
const router = express.Router();

const controller = require('../controllers/users.controller');
const validate = require('../validate/users.validate')
//default users view and search
router.get("/", controller.index);

//delete user
router.get("/delete/:id", controller.delete);
//update user
router.get("/update/:id", controller.getUpdate);
router.post("/update/:id", controller.postUpdate);
//create new user
router.post("/create", validate.postCreate, controller.postCreate);

module.exports = router;
