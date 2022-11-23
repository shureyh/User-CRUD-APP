//imports

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser= require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose.connect(process.env.MONGO_DEV_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected!")).catch(err => console.log(err));


//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
  secret: "my secret key",
  saveUninitialized: true,
  resave: false,
})
);
app.use((req, res, next) =>{
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(express.static("uploads"));
//set template engine
app.set("view engine", "ejs");


// route prefix
app.use("", require("./routes/routes"));

























































app.listen(PORT, function () {
  console.log("Server Started at http://localhost:" + PORT);
});