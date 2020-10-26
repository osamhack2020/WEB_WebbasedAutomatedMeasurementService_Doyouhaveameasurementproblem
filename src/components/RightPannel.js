/* eslint-disable */
import React, { Component } from 'react';
//import axios from 'axios';
import '../css/RightPannel.css';
import { Spinner } from 'react-bootstrap';
import ProcedureFinished from '../components/ProcedureFinished';
import io from 'socket.io-client';
const socket = io.connect('https://express-server.run.goorm.io');
class RightPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      length: 1000,
      title: null,
      vals: null,
      units: null,
      messageHistory: [],
      messageInput: '',
      procedureList: [],
      current_index: 0,
      beforeValue: -10000,
      procedureStatus: Array(30).fill(null),
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
    if (this.state.length <= this.state.current_index) {
      var tmp = this.state.procedureStatus.slice(0, this.state.length);

      return (
        <div className="d-flex align-items-center p-5">
          측정완료
          <ProcedureFinished
            vals={this.state.vals}
            result={tmp}
            userId={this.state.id}
            adminName={this.props.adminName}
            adminRegion={this.props.adminRegion}
            adminRank={this.props.adminRank}
          />
          <button
            data-toggle="modal"
            data-target="#procedureFinished"
            type="button"
          >
            측정 결과 저장.
          </button>
        </div>
      );
    } else if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      this.state.id = this.props.id;
      this.state.length = this.props.procedureContent.length;
      this.state.title = this.props.procedureContent.title;
      this.state.vals = this.props.procedureContent.test_vals.split(' ');
      this.state.units = this.props.procedureContent.test_units.split(' ');
      // eslint-disable-next-line
      // 성공시 list-group-item-success 실패시 list-group-item-secondary
      if (this.props.procedureContent && this.state.vals) {
        this.state.procedureList = this.state.vals.map((data, index) => {
          if (index === this.state.current_index) {
            return (
              <li
                className="list-group-item list-group-item-secondary"
                key={index}
              >
                <Spinner className="" animation="grow" size="sm" />
                {index +
                  1 +
                  '.  ' +
                  data +
                  this.state.units[index] +
                  ' 측정하기.'}
              </li>
            );
          } else if (index < this.state.current_index) {
            return (
              <li
                className="list-group-item list-group-item-success"
                key={index}
              >
                {index +
                  1 +
                  '.  ' +
                  data +
                  this.state.units[index] +
                  ' 측정하기.'}
              </li>
            );
          } else {
            return (
              <li className="list-group-item " key={index}>
                {index +
                  1 +
                  '.  ' +
                  data +
                  this.state.units[index] +
                  ' 측정하기.'}
              </li>
            );
          }
        });
      }
      // 측정된 값과 비교하는 코드.
      var current_index = this.state.current_index;

      if (this.state.beforeValue !== this.props.value) {
        if (
          parseFloat(parseFloat(this.state.vals[current_index])) - 0.1 <
            parseFloat(this.props.value) &&
          parseFloat(this.props.value) <
            parseFloat(this.state.vals[current_index]) + 0.1 &&
          this.state.units[current_index] === this.props.unit
        ) {
          this.state.procedureStatus[current_index] = parseFloat(
            this.props.value,
          );
          console.log(this.props.value + ' success');
          this.state.current_index = current_index + 1;
        }
        this.state.beforeValue = this.props.value;
      }

      return (
        <div id="RightPannel" className="d-flex flex-row align-items-center">
          <div className="d-flex bg-light overflow-auto" id="ProceduresPannel">
            <ul className="list-group">
              <li className="list-group-item list-group-item-success">
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
      this.state = {
        id: null,
        length: 1000,
        title: null,
        vals: null,
        units: null,
        messageHistory: [],
        messageInput: '',
        procedureList: [],
        current_index: 0,
        beforeValue: -10000,
        procedureStatus: Array(30).fill(null),
      };
      return (
        <div className="d-flex align-items-center p-5" id="RightPannel">
          상단에 있는 사용자와 작업을 선택한 뒤에 측정시작 버튼을 눌러주세요.
        </div>
      );
    }
  }
}

export default RightPannel;
