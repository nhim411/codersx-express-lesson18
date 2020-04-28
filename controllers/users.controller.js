const shortid = require("shortid");
const db = require("../db");

const bcrypt = require('bcrypt');
const saltRounds = 10;
//users index
module.exports.index = (req, res) => {
  var userId = req.cookies.userId;
  
  res.render("./users", {
    users: db.get("users").value()
  });
};
//users delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};
//users create
module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  db.get("users").push(req.body).write();
  res.redirect("/users");

};
//users update
module.exports.getUpdate = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("./users/update", {
    user: user
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  db.get("users")
    .find({ id: id })
    .assign({ name: name })
    .write();
  res.redirect("/users");
};
