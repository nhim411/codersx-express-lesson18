const db = require("../db");
module.exports.postCreate = function(req, res, next) {
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is required");
  }
    if (!req.body.email) {
    errors.push("email is required");
  }
    if (!req.body.password) {
    errors.push("password is required");
  }
  if (req.body.name.length > 30) {
    errors.push("Name must be less than 30 charaters");
  }
  if (errors.length) {
    res.render("./users", {
      users: db.get("users").value(),
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
};
