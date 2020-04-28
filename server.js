const express = require("express");

const usersRoute = require('./routes/users.route');
const booksRoute = require('./routes/books.route');
const transactionsRoute = require('./routes/transactions.route')
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.ESSION_SECRET));

app.get("/",authMiddleware.requireAuth, function(req, res) {
  var userId = req.cookies.userId
  res.render('index',{
    userId : userId
  })
});
app.use('/auth', authRoute);
app.use('/users',authMiddleware.requireAuth, usersRoute);
app.use('/books',authMiddleware.requireAuth, booksRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionsRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
