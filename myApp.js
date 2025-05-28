let express = require("express");
let app = express();

// console.log("HRBP  Hello World");

// app.get("/json", (req, res) => {
//   let message = "Hello json";
//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     message = message.toUpperCase();
//   }
//   res.send({ message: message });

//   let absolutePath = __dirname + "/views/index.html";
//   res.sendFile(absolutePath);
// });

app.get("/name", function (req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;

  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time,
  });
});

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//   //res.json({ message: "Hello json" });

//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     res.json({ message: "HELLO JSON" });
//   } else {
//     res.json({ message: "Hello json" });
//   }
//   // let absolutePath = __dirname + "/views/index.html";
//   // res.sendFile(absolutePath);
// });

// app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
