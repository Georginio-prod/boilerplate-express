let express = require("express");
let app = express();

// Middleware setup - order matters!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global logging middleware
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Static files
app.use("/public", express.static(__dirname + "/public"));

// POST /name endpoint
app.post("/name", function (req, res) {
  res.json({ name: req.body.first + " " + req.body.last });
});

// GET /name endpoint
app.get("/name", function (req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// Echo endpoint
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

// Time middleware and endpoint
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.json({
    time: req.time,
  });
});

module.exports = app;
