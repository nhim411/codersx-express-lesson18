const db = require("../db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY_2);
const msg = {
  to: 'lhnam411@gmail.com',
  from: 'Admin web Book Manager',
  subject: 'Thong bao qua so lan dang nhap Book Manager',
  text: 'Ban da nhap sai mat khau qua 4 lan, bam vao link de mo khoa',
  html: '<strong>Ban da nhap sai mat khau qua 4 lan, bam vao link de mo khoa</strong>',
};
module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var passwordInput = req.body.password;
  var user = db.get("users").find({ email: email }).value();
  var errors = [];

  if (!user) {
    errors.push("User does not axist.");
    res.render("auth/login", {
      errors: errors,
      values: req.body
    });
    return;
  }
  var wrongLoginCount = parseInt(user.wrongLoginCount);
  if (wrongLoginCount == 4) {
    sgMail.send(msg);
    errors.push("You have entered the wrong password more than 4 times.");
    res.render("auth/login", {
      errors: errors,
      values: req.body
    });
    return;
  }
  if (!bcrypt.compareSync(passwordInput, user.password)) {
    console.log(passwordInput,user.password,bcrypt.compareSync(passwordInput, user.password));
    db.get("users")
      .find({ email: email })
      .assign({ wrongLoginCount: wrongLoginCount + 1 })
      .write();
    errors.push("Wrong password.");
    res.render("auth/login", {
      errors: errors,
      values: req.body
    });
    return;
  }
  res.cookie("userId", user.id,{
    signed: true
  });
  res.redirect("/users");
};
