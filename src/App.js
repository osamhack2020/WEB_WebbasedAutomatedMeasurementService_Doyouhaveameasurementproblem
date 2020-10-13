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
      <div className="d-flex flex-column align-items-center">
        <header className="d-flex justify-content-center App-header">
          {/* {this.state.username} */}
        </header>
        {/* <img
          className="d-flex justify-content-center"
          id="teamLogo"
          src="./teamLogo.jpg"
        /> */}
        <Main />
      </div>
    );
  }
}

export default App;
