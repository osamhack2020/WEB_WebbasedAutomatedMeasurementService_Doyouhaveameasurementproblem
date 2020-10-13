import React, { Component } from 'react';
import axios from 'axios';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: null,
    };
  }
  handleClick = (path) => () => {
    this.fetchData(path);
    console.log(this.state.value);
  };
  async fetchData(path) {
    return await axios
      .get('https://express-server.run.goorm.io/' + path)
      .then((res) => res.data)
      .then((data) => this.setState({ value: data.value }));
  }
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row justify-content-center">
          <LeftPannel value={this.state.value} onClick={this.handleClick} />
          <RightPannel />
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="display1">Chart.js</h1>
        </div>
      </div>
    );
  }
}

export default Main;
