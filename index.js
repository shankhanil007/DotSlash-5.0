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

// App routes
app.get("/2021", (req, res) => {
  res.render("home_4");
});

app.get("/2022", (req, res) => {
  res.render("home_5");
});

app.get("/final", (req, res) => {
  res.render("final1");
});

app.get("/alumni", (req, res) => {
  res.render("alumni");
});

app.get("/coc", (req, res) => {
  res.render("coc");
});

app.get("/registration", (req, res) => {
  res.render("form");
});

app.use("/api", require("./routes/index.routes"));

app.listen(port);
