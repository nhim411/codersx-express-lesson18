const shortid = require("shortid");

const db = require('../db');

module.exports.index = function(req, res) {
  var userId = req.signedCookies.userId;
  var isAdmin = db.get('users').find({id:userId}).value();
  if(isAdmin.isAdmin){
    res.render('transactions/index',{
      transactions : db.get('transactions').value(),
      userId: userId
    })
    return;
  }else{
    var dataMatched = db.get('transactions').filter({userId:userId}).value();
    res.render('transactions/index',{
      transactions : dataMatched,
      userId: userId
    })
  }
  // res.render("transactions/index", {
  //   transactions: db.get("transactions").value(),
  // });
}

module.exports.getCreate = function(req, res) {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
}

module.exports.isComplete = function(req, res) {
  db.get('transactions')
    .find({ id: req.params.id })
    .assign( { isComplete: true } )
    .write();
  res.redirect('/transactions');
};