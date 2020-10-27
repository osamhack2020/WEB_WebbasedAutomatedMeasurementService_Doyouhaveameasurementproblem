import React, { Component } from 'react';
import '../css/LeftPannel.css';
import Display from './Display';

class LeftPannel extends Component {
  render() {
    if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      return (
        <div
          id="LeftPannel"
          className="d-flex flex-column align-items-stretch justify-content-center border border-dark rounded mb-1 p-5 bg-secondary"
        >
          <Display
            unit={this.props.unit}
            value={this.props.value}
            onClick={this.props.onClick}
            onClear={this.props.onClear}
          />
        </div>
      );
    } else {
      return (
        <div
          id="LeftPannel"
          className="d-flex  align-items-center border border-dark rounded mb-1 p-5 "
        >
          상단에 있는 사용자와 작업을 선택한 뒤에 측정시작 버튼을 눌러주세요.
        </div>
      );
    }
  }
}

export default LeftPannel;
