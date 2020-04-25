import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {users: []}

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);

    let data = {
      "operation" : "Add",
      "id" : formData.get('id'),
      "name" : formData.get('name'),
      "category": formData.get('category'),
      "cost": formData.get('cost')
    }
    console.log(JSON.stringify(data));
    console.log(data);
    
    fetch('/users', {
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify(data),
      method: 'post'
    })
    .then(res => res.json())
    .then(users => this.setState({ users }));
  }

  handleDelete(event) {
    event.preventDefault();
    
    let data = {
      "operation" : "Remove",

    }

    fetch('/users', {
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify(data),
      method: 'post'
    })
    .then(res => res.json())
    .then(users => this.setState({ users }));
    
  }

  render() {
    return (
      <div className="App">
        <h1>Expense Tracker</h1>
        <h5>New Expense</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name"></input>
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value = "Housing">Housing</option>
            <option value = "Transportation">Transportation</option>
            <option value = "Consumables">Consumables</option>
            <option value = "Living Expenses">Living Expenses</option>
            <option value = "Savings">Savings</option>
            <option value = "Debt">Debt</option>
          </select>
          <label htmlFor="cost">Cost</label>
          <input type="text" id="cost" name="cost"></input>
          <input type="submit"></input>
        </form>

        <h5>Transactions</h5>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Category</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => 
              <tr key={user.id}>
                <td><button onClick={this.handleDelete}>Delete</button></td>
                <td>{user.name} </td>
                <td>{user.category} </td>
                <td>${user.cost} </td>
              </tr>
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
