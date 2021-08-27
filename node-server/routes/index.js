var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.json("d212333o1sa");
  res.send("yeah it's running !!");
  // res.render("index", { title: "Eweess" });
});

module.exports = router;
