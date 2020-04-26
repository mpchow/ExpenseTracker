import React, { Component } from 'react';
import './App.css';
import './fonts/Raleway/Raleway-Light.ttf';

class App extends Component {
  // Initialize state as an array
  state = {transactions: []}

  //Create a constructor so I can bind the handle functions
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //When we mount, want to display the current transactions stored in the database
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(transactions => this.setState({ transactions }));
  }

  //Handler when a new transaction is added
  handleSubmit(event) {
    event.preventDefault();
    
    //Grab the current form data, and store it into a formData object to access
    let formData = new FormData(event.target);

    //After the user clicks add, we want to reset the fields of the form
    document.getElementById("form").reset();

    //Create a json object to store all of the fields of a transaction,
    //grabbing the fields from the formData object
    let data = {
      "operation" : "Add",
      "id" : formData.get('id'),
      "name" : formData.get('name'),
      "category": formData.get('category'),
      "cost": formData.get('cost')
    }

    //Send the data to the backend, update the ui if possible
    fetch('/users', {
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify(data),
      method: 'post'
    })
    .then(res => res.json())
    .then(transactions => this.setState({ transactions }));

    //Updates the ui again just to make sure it displays the updated changes.
    //This is a bad implementation however I ran out of time to fix this.
    fetch('/users')
    .then(res => res.json())
    .then(transactions => this.setState({ transactions }));
  }

  //Handler when the user deletes an item from the list
  handleDelete(event) {
    event.preventDefault();
    
    //Create a json object with the id and operation only as we only require the id to remove an item
    let data = {
      "operation" : "Remove",
      "id" : event.target.id
    }

    //Again push the data to the backend, update ui
    fetch('/users', {
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify(data),
      method: 'post'
    })
    .then(res => res.json())
    .then(transactions => this.setState({ transactions }));


    //Again updates ui, bad implementation.
    fetch('/users')
    .then(res => res.json())
    .then(transactions => this.setState({ transactions }));
    
  }

  //Function to render the html elements
  render() {
    return (
      <div className="App">
        <h1 id="title">Expense Tracker</h1>
        <h3>New Expense</h3>
        {/* Call the submit handler when a new item is added */}
        <form id="form" onSubmit={this.handleSubmit}>
          <div class="input">
            <input type="text" id="name" name="name" placeholder="Name"></input>
          </div>
          <div class="input">
            <input type="text" id="cost" name="cost" placeholder="Cost"></input>
          </div>
          {/* Creates a drop down menu to select from the various categories */}
          <div class="input">
            <select id="category" name="category">
              <option value = "Housing">Housing</option>
              <option value = "Transportation">Transportation</option>
              <option value = "Consumables">Consumables</option>
              <option value = "Living Expenses">Living Expenses</option>
              <option value = "Savings">Savings</option>
              <option value = "Debt">Debt</option>
            </select>
          </div>
          <div class="input">
            <input type="submit" value="Add"></input>
          </div>
          <br></br>
        </form>

        <div class="Data">
          <h3>Transactions</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {/* When we update the state, map each item of the transactions array to a table row */}
              {this.state.transactions.map(transactions => 
                <tr key={transactions.id}>
                  <td id="delete"><button id={transactions.name} onClick={this.handleDelete}>Delete</button></td>
                  <td>{transactions.name} </td>
                  <td>${transactions.cost} </td>
                  <td>{transactions.category} </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
