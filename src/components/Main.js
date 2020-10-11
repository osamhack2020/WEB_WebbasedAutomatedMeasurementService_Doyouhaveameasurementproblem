import React, { Component } from 'react';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
class Main extends Component {
  render() {
    return (
      <div className="d-flex flex-row justify-content-center">
        <LeftPannel />
        <RightPannel />
      </div>
    );
  }
}

export default Main;
