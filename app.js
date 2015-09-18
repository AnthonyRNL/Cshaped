var express = require("express");
var ejs = require("ejs");
// var bodyParser = require("body-parser");
var app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", function(req,res){
  res.render("index.html.ejs")
})

app.listen(3000, function(){
  console.log("Heyy, i'm listening...")
})
