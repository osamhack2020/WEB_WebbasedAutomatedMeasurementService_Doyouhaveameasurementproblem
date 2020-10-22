import React, { Component } from 'react';
import axios from 'axios';
import '../css/RightPannel.css';
import { Spinner } from 'react-bootstrap';

class RightPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      return (
        <div
          id="RightPannel"
          className="d-flex flex-row align-items-center overflow-auto"
        >
          <div className="d-flex bg-light">
            <ul id="ProceduresPannel" className="list-group">
              <li className="list-group-item list-group-item-success">
                0. 장비 연결 테스트
              </li>
              <li className="list-group-item list-group-item-success">
                1. 전압 DC 5V 테스트
              </li>
              <li className="list-group-item list-group-item-secondary">
                <Spinner className="" animation="grow" size="sm" />
                2. 전류 20A 테스트
              </li>
              <li className="list-group-item ">3. 주파수 10KHz 테스트</li>
              <li className="list-group-item ">4. 주기 0.005 sec 테스트</li>
              <li className="list-group-item ">5. 저항 10Ω 테스트</li>
            </ul>
          </div>
          <div id="ChattingPannel" className="d-flex bg-light overflow-auto">
            <ul className="list-group">
              <li className="list-group-item list-group-item-success">
                안녕ㅎ세요
              </li>
              <li className="list-group-item list-group-item-success">
                안녕ㅎ세요
              </li>
              <li className="list-group-item list-group-item-secondary">
                안녕ㅎ세요
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex align-items-center p-5">
          상단에 있는 사용자와 작업을 선택한 뒤에 측정시작 버튼을 눌러주세요.
        </div>
      );
    }
  }
}

export default RightPannel;
