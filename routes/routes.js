const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
  res.render("index", {title: "Home Page"});
});

router.get("/add",function(req, res){
  res.render("add_users", {title:"Add Users"});
});

module.exports = router;