import React, { Component } from 'react';
import Buttons from './Buttons';
import '../css/Display.css';
// 34401a의 화면을 담당하는 컴포넌트 Parent Component: LeftPannel
class Display extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-stretch">
        <div
          id="Display"
          className="d-flex flex-row bg-dark align-items-stretch text-wrap p-1 border border-light rounded-lg"
        >
          <b className="d-flex align-items-start text-white ml-2 mr-4">
            34401A
          </b>
          {/* <span className="d-flex align-items-start text-white">
            6 1/2 Digit multimeter
          </span> */}
          <div className="d-flex justify-content-end">
            <h1
              id="value"
              className="d-flex align-items-center d-inline display-4 text-info inline m-2"
            >
              {this.props.value}
            </h1>
            <em
              id="unit"
              className="d-flex display-4 d-inline align-items-end text-info m-2"
            >
              {this.props.unit}
            </em>
            <span
              id="curr"
              className="d-flex display-4 d-inline align-items-end text-info m-2"
            >
              {this.props.curr}
            </span>
          </div>
        </div>
        <Buttons onClick={this.props.onClick} onClear={this.props.onClear} />
      </div>
    );
  }
}

export default Display;
