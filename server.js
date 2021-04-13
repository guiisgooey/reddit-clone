const express = require("express");

// App Setup
const app = express();

// Middleware
const exphbs = require("express-handlebars");

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

app.listen(3000, () => {
  console.log("Reddit Clone listening on port localhost:3000!");
});
