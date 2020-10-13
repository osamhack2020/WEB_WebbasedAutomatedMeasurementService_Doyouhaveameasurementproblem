import React, { Component } from 'react';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';

class Main extends Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row justify-content-center">
          <LeftPannel />
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
