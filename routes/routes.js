const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/users');
const multer = require("multer");

//image upload
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads");
  }, 
  filename: function(req, file, cb){
    cb(null, file.fieldname + "_" + Date.now()+ "_" + file.originalname);
  }
});
var upload = multer({
  storage: storage,
}).single("image");
// insert a user into database route
router.post("/add", upload, function(req, res){
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  user.save((err)=>{
    if(err){
      res.json({message: err.message, type:"danger"});
    }else{
      req.session.message ={
        type: "success",
        message: "User added successfully"
      };
      res.redirect("/");
    }
  })
})




//get all users route
router.get("/", function(req, res){
User.find().exec((err, users)=>{
  if(err){
    res.json({message: err.message});
  }else{
    res.render("index", {
      title: "Home Page",
      users: users
    })
  }
})
});

router.get("/add",function(req, res){
  res.render("add_users", {title:"Add Users"});
});

module.exports = router;