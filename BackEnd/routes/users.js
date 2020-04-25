var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  //Here this is on the create, want to get the data from the database
  res.json([
    {id: 1, name: "Groceries", category: "Living Expense", cost: 50.00},
    {id: 2, name: "Rent", category: "Housing", cost: 1200},
    {id: 2, name: "Utilites", category: "Housing", cost: 120},
  ])
});

router.post('/', function(req, res) {
 let json = JSON.parse(JSON.stringify(req.body).substring(2, JSON.stringify(req.body).length - 5).replace(/\\/g, ""));

 if (json.operation === "Remove") {
  console.log("We are removing")
 }
 else {
  console.log("We are adding")
 }

  res.json([
    {id: 1, name: "Groceries", category: "Living Expense", cost: 50.00},
    {id: 2, name: "Rent", category: "Housing", cost: 1200}
  ])

});

module.exports = router;
