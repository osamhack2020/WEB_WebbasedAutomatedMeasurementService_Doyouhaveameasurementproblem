/* eslint-disable */
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
      id: null,
      length: null,
      title: null,
      vals: null,
      units: null,
      procedureStatus: null,
      messageHistory: [],
      messageInput: '',
      procedureList: [],
    };
    socket.on('message to admin', (message) => {
      //console.log(message);
      var tmp = this.state.messageHistory.concat(
        <div className="incoming_msg">
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{'ID: ' + message.id}</p>
              <p>{message.message}</p>
              <span className="time_date"></span>
            </div>
          </div>
        </div>,
      );
      this.setState({ messageHistory: tmp });
    });
  }
  componentDidMount() {
    var tmp = [
      <div className="incoming_msg">
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{this.state.id}</p>
            <span className="time_date"></span>
          </div>
        </div>
      </div>,
    ];
    this.setState({ messageHistory: tmp });
  }

  sendMessage = () => {
    //console.log('sendMessage');
    socket.emit('send message from admin', {
      id: this.state.id,
      message: this.state.messageInput,
    });
    var tmp = this.state.messageHistory.slice(undefined);
    var d = new Date();
    var nowTime =
      d.getFullYear() +
      '/' +
      (d.getMonth() + 1) +
      '/' +
      d.getDate() +
      '/' +
      d.getHours() +
      '시' +
      d.getMinutes() +
      '분' +
      d.getSeconds() +
      '초';
    tmp.push(
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{this.state.messageInput}</p>
          <span className="time_date">{nowTime}</span>
        </div>
      </div>,
    );

    //메시지 비우기, history 업데이트
    this.setState({ messageInput: '', messageHistory: tmp });
  };
  onInputChanged = (event) => {
    this.setState({ messageInput: event.target.value });
  };
  render() {
    if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      this.state.id = this.props.id;
      this.state.length = this.props.procedureContent.length;
      this.state.title = this.props.procedureContent.title;
      this.state.vals = this.props.procedureContent.test_vals.split(' ');
      this.state.units = this.props.procedureContent.test_units.split(' ');
      this.state.procedureStatus = Array(this.length).fill(null);
      // eslint-disable-next-line
      // 성공시 list-group-item-success 실패시 list-group-item-secondary
      if (this.props.procedureContent && this.state.vals) {
        this.state.procedureList = this.state.vals.map((data, index) => (
          <li className="list-group-item " key={index}>
            {index + 1 + '.  ' + data + this.state.units[index] + ' 측정하기.'}
          </li>
        ));
      }
      return (
        <div id="RightPannel" className="d-flex flex-row align-items-center ">
          <div className="d-flex bg-light overflow-auto">
            <ul id="ProceduresPannel" className="list-group">
              <li className="list-group-item list-group-item-success">
                <Spinner className="" animation="grow" size="sm" />
                0. 장비 연결 테스트
              </li>
              {this.state.procedureList}
            </ul>
          </div>
          <div
            id="ChattingPannel"
            className="d-flex flex-column bg-light overflow-auto"
          >
            <div className="msg_history">{this.state.messageHistory}</div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  onChange={this.onInputChanged}
                  value={this.state.messageInput}
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                />
              </div>
            </div>
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
