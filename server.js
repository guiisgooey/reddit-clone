require("dotenv").config();

const express = require("express");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// App Setup
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3000;

// Middleware
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (
    typeof req.cookies.nToken === "undefined" ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

// Add after body parser initialization!
app.use(expressValidator());

// Set db
require("./data/reddit-db");

require("./controllers/posts.js")(app);

require("./controllers/comments.js")(app);

require("./controllers/auth.js")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  title = "";
  text = "";
  if (req.query.title) {
    title = req.query.title;
  }
  if (req.query.text) {
    text = req.query.text;
  }

  res.render("home");
});

app.get("/new/post", (req, res) => {
  title = "";
  text = "";
  if (req.query.title) {
    title = req.query.title;
  }
  if (req.query.text) {
    text = req.query.text;
  }

  res.render("posts-new");
});

app.listen(port, () => {
  console.log(`Reddit Clone listening on port ${port}!`);
});

module.exports = app;
