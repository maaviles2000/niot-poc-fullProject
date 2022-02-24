const express = require("express");
const app = express();

const port = 4001;

app.listen(port, () => {
  console.log("Server on: " + port);
});

app.post("/hello", (req, res) => {
  res.send("[POST] HELLO WORLD");
});

app.get("/hello", (req, res) => {
  res.send("[GET] HELLO WORLD");
});

app.put("/hello", (req, res) => {
  res.send("[UPDATE] HELLO WORLD");
});

app.delete("/hello", (req, res) => {
  res.send("[DELETE] HELLO WORLD");
});

app.get("/", (req, res) =>{
    res.send("[GET] HELLO DEVOPS");
});
