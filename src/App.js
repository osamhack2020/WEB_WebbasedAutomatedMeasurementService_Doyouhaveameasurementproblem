import React, { Component } from "react";
import axios from "axios";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  componentDidMount() {
    axios
      .get("/api/test")
      .then((res) => res.data)
      .then((data) => this.setState({ username: data.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <header className="App-header">
          {username ? `hello ${username}` : "Hello React"}
        </header>
      </div>
    );
  }
}

export default App;
