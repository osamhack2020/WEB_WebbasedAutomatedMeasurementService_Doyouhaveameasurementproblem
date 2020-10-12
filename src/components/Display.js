import React, { Component } from 'react';
import Buttons from './Buttons';
import '../css/Display.css';

class Display extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-stretch">
        <div
          id="Display"
          className="d-flex flex-row bg-dark text-wrap p-2 border border-light rounded-lg"
        >
          <b className="d-flex align-items-start text-white">34401A</b>
          <span className="d-flex align-items-start text-white">
            6 1/2 Digit multimeter
          </span>
          <h1 className="d-flex align-items-center d-inline display-2 text-info inline m-2">
            {this.props.value}
          </h1>
          <em className="d-flex display-4 d-inline align-items-end text-info m-2">
            mV
          </em>
          <span className="d-flex display-4 d-inline align-items-end text-info m-2">
            DC
          </span>
        </div>
        <Buttons onClick={this.props.onClick} />
      </div>
    );
  }
}

export default Display;
