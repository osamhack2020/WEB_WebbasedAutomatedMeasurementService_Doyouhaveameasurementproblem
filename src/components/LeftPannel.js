import React, { Component } from 'react';
import '../css/LeftPannel.css';
import Display from './Display';
import Buttons from './Buttons';
class LeftPannel extends Component {
  render() {
    return (
      <div
        id="LeftPannel"
        className="d-flex flex-column align-items-stretch border border-light rounded-lg p-5 bg-secondary"
      >
        <Display />
        <Buttons />
      </div>
    );
  }
}

export default LeftPannel;
