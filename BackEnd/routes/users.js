var express = require('express');
var router = express.Router();

//Url to access mongodb atlas
const url = 'mongodb+srv://expenseTracker:bgSlTwr5nCwMYJqw@cluster0-9tbyy.mongodb.net/test?retryWrites=true&w=majority';

//Use mongoose to help interact with mongodb
const mongoose = require('mongoose');

//Create a model that represents a transaction
const { Schema } = mongoose;
const expenseSchema = new Schema({
  id: String,
  name: String,
  category: String,
  cost: String
});

const Expense = mongoose.model('Expense', expenseSchema);

//On create, want to connect to the database
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB Connected…')})
.catch(err => console.log(err))

//Handles general ui updates from the frontend
router.get('/', function(req, res) {

  //Find all of the documents stored in the database and return to the frontend as a json
  Expense.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//Handles additions and deletions to the database
router.post('/', function(req, res) {
  //When recieved, req is not exactly a json object so I transform into a string,
  //and remove the unecessary characters to turn it into a json string that we can parse
  let json = JSON.parse(JSON.stringify(req.body).substring(2, JSON.stringify(req.body).length - 5).replace(/\\/g, ""));

  //Want to check which operation we are doing 
  if (json.operation === "Remove") {
    //Use the id from the json we recieve to delete the document from the database
    Expense.deleteOne({ id: json.id }, function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
  }
  else {
    //We want to create a new document with the appropriate fields
    //Note: Instead of just name, if I had enough time I would have created a hash function to create a unique integer to use as the id
    const expense = new Expense({id: json.name, name: json.name, category: json.category, cost: json.cost});
    //Now we save the new document onto the database
    expense.save(error => {
      if (error) {
        return console.log(`Error has occurred: ${error}`);
      }
      console.log('Document is successfully saved.');
    })
  }

  //Bad implementation as described in App.js
  //Same code as above to update the ui
  Expense.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    } 
  });

});

module.exports = router;
