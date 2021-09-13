const express = require("express");
const hbs = require("hbs");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 3000;

// compress all responses
app.use(compression());

// express middleware setup
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// partial setup
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/coc", (req, res) => {
  res.render("coc");
});

app.listen(port);
