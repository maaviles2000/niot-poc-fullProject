const express = require("express");
const app = express();

const port = 4001;

app.listen(port, () => {
  console.log("Server on: "+port);
});

app.post("/hello", function (req, res) {
  res.send("[POST] HELLO WORLD");
});

app.get("/hello", function (req, res) {
  res.send("[GET] HELLO WORLD");
});

app.get("/", function(req, ses){
    res.send("[GET] HELLO DEVOPS")
});
