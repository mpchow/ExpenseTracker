var express = require('express');
var router = express.Router();
const url = 'mongodb+srv://expenseTracker:bgSlTwr5nCwMYJqw@cluster0-9tbyy.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

const { Schema } = mongoose;
const expenseSchema = new Schema({
  id: String,
  name: String,
  category: String,
  cost: String
});

const Expense = mongoose.model('Expense', expenseSchema);

/* GET users listing. */
router.get('/', function(req, res) {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log('MongoDB Connected…')})
  .catch(err => console.log(err))

  //Here this is on the create, want to get the data from the database
  res.json([
    {id: 1, name: "Groceries", category: "Living Expense", cost: 50.00},
    {id: 2, name: "Rent", category: "Housing", cost: 1200},
    {id: 3, name: "Utilites", category: "Housing", cost: 120},
  ])
});

router.post('/', function(req, res) {
 let json = JSON.parse(JSON.stringify(req.body).substring(2, JSON.stringify(req.body).length - 5).replace(/\\/g, ""));

 if (json.operation === "Remove") {
  Expense.deleteOne({ id: json.id }, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
 }
 else {
  const expense = new Expense({id: json.name, name: json.name, category: json.category, cost: json.cost});
  expense.save(error => {
    if (error) {
      return console.log(`Error has occurred: ${error}`);
    }
    console.log('Document is successfully saved.');
  })
 }

  res.json([
    {id: 1, name: "Groceries", category: "Living Expense", cost: 50.00},
    {id: 2, name: "Rent", category: "Housing", cost: 1200}
  ])

});

module.exports = router;
