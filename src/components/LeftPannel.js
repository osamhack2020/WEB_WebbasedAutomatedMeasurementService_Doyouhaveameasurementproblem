import React, { Component } from 'react';
import axios from 'axios';
import '../css/LeftPannel.css';
import Display from './Display';

class LeftPannel extends Component {
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
  // handleClick = () => {
  //   this.fetchData();
  //   console.log(this.state.value);
  // };
  // async fetchData() {
  //   return await axios
  //     .get('https://express-server.run.goorm.io/meas/volt/ac')
  //     .then((res) => res.data)
  //     .then((data) => this.setState({ value: data.volt }));
  // }
  render() {
    return (
      <div
        id="LeftPannel"
        className="d-flex flex-column align-items-stretch border border-light rounded-lg p-5 bg-secondary"
      >
        <Display value={this.state.value} onClick={this.handleClick} />
      </div>
    );
  }
}

export default LeftPannel;
