import React, { Component } from 'react';
//import axios from 'axios';
import '../css/RightPannel.css';
import { Spinner } from 'react-bootstrap';
import io from 'socket.io-client';
const socket = io.connect('https://express-server.run.goorm.io');
class RightPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: null,
      procidureContent: null,
      title: null,
      vals: null,
      units: null,
      procedureStatus: null,
      editMessage: ' ',
    };
  }
  sendMessage = () => {
    console.log('sendMessage');
    socket.emit('chat message', 'hi server');
  };
  render() {
    if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      // eslint-disable-next-line
      this.state = {
        length: this.props.procedureContent.length,
        procidureContent: this.props.procedureContent,
        title: this.props.procedureContent.title,
        vals: this.props.procedureContent.test_vals.split(' '),
        units: this.props.procedureContent.test_units.split(' '),
        procedureStatus: Array(this.length).fill(null),
      };
      var procedurelist_items;
      if (this.state.procedureContent !== null) {
        procedurelist_items = this.state.vals.map((data, index) => (
          <li className="list-group-item list-group-item-success" key={index}>
            {index + 1 + '.  ' + data + this.state.units[index] + ' 측정하기.'}
          </li>
        ));
      }
      return (
        <div id="RightPannel" className="d-flex flex-row align-items-center ">
          <div className="d-flex bg-light overflow-auto">
            <ul id="ProceduresPannel" className="list-group">
              <li className="list-group-item list-group-item-success">
                0. 장비 연결 테스트
              </li>
              {procedurelist_items}
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
          <div
            id="ChattingPannel"
            className="d-flex flex-column bg-light overflow-auto"
          >
            <ul className="list-group">
              <li className="list-group-item">안녕ㅎ세요</li>
              <li className="list-group-item ">안녕ㅎ세요</li>
              <li className="list-group-item ">안녕ㅎ세요</li>
            </ul>
            <button
              className="d-flex-inline align-items-end"
              type="button"
              onClick={this.sendMessage}
            >
              Send
            </button>
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
