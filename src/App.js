import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Main from './components/Main';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://express-server.run.goorm.io/')
      .then((res) => res.data)
      .then((data) => this.setState({ username: data.value }));
  }

  render() {
    return (
      <div>
        <header className="App-header">{this.state.username}</header>
        <Main />
      </div>
    );
  }
}

export default App;
