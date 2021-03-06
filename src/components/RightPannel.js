/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import ProcedureFinished from '../components/ProcedureFinished';
import io from 'socket.io-client';
const socket = io.connect('https://express-server.run.goorm.io');
import '../css/RightPannel.css';
// Admin34401a의 오른쪽 UI 부분 담당 컴포넌트
class RightPannel extends Component {
  constructor(props) {
    super(props);
    // 채팅 스크롤 아래로 내리기 위한 Ref
    this.divRef = React.createRef();
    // state 초기화
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
      this.setState({ messageHistory: tmp }, this.scrollToBottom);
    });
    this.plusOneCurrentIndex = this.plusOneCurrentIndex.bind(this);
  }
  // 현재 과정 진행 상황 전송 함수
  sendProcedureStatus = () => {
    socket.emit('send procedureStatus from admin', {
      current_index: this.state.current_index,
      title: this.state.title,
      id: this.state.id,
    });
  };
  // 메시지 전송 함수
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

    //메시지 비우기, history 업데이트, 스크롤 아래로
    this.setState(
      { messageInput: '', messageHistory: tmp },
      this.scrollToBottom,
    );
  };
  // 보낼 메세지 값을 저장하는 함수
  onInputChanged = (event) => {
    this.setState({ messageInput: event.target.value });
  };
  // index값 1 증가 함수
  plusOneCurrentIndex = () => {
    this.setState({
      current_index: this.state.current_index + 1,
    });
  };
  // 채팅 스크롤을 아래로 내리는 함수
  scrollToBottom = () => {
    this.divRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  // 엔터키 입력시 메시지 전송 함수
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };
  render() {
    if (this.state.length === this.state.current_index) {
      // 측정과정이 다 끝났을 때
      var tmp = this.state.procedureStatus.slice(0, this.state.length);
      this.sendProcedureStatus();
      return (
        <Fragment>
          <div id="RightPannel" className="d-flex flex-row align-items-center">
            <div
              className="p-4 bg-secondary border mb-1 border-dark rounded mr-1"
              id="ResultPannel"
            >
              <div
                className="p-1 border bg-dark border-light rounded-lg mb-5"
                id="Complete"
              >
                측정완료
              </div>
              <button
                data-toggle="modal"
                data-target="#procedureFinished"
                type="button"
                className="btn btn-dark border-light button-big"
                id="SaveBtn"
              >
                측정 결과 저장
              </button>
            </div>
            <div
              id="ChattingPannel"
              className="d-flex flex-column bg-light overflow-auto border border-dark rounded mb-1"
            >
              <div className="msg_history">
                {this.state.messageHistory}
                <div ref={this.divRef} />
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    onChange={this.onInputChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.messageInput}
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                  />
                </div>
              </div>
              <button
                className="d-flex-inline align-items-end btn-dark"
                type="button"
                onClick={this.sendMessage}
              >
                Send
              </button>
            </div>
          </div>
          <ProcedureFinished
            selectedProcedure={this.props.procedure}
            vals={this.state.vals}
            result={tmp}
            userId={this.state.id}
            adminName={this.props.adminName}
            adminRegion={this.props.adminRegion}
            adminRank={this.props.adminRank}
            handleStopMeasuring={this.props.handleStopMeasuring}
            plusOneCurrentIndex={this.plusOneCurrentIndex}
          />
        </Fragment>
      );
    } else if (
      this.props.connected &&
      this.props.connected === this.props.id &&
      this.props.procedure
    ) {
      // 측정 과정이 실행중일때
      this.state.id = this.props.id;
      this.state.length = this.props.procedureContent.length;
      this.state.title = this.props.procedureContent.title;
      this.state.vals = this.props.procedureContent.test_vals.split(' ');
      this.state.units = this.props.procedureContent.test_units.split(' ');
      this.sendProcedureStatus();
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
      // 측정된 값이 허용오차 안인지 확인하는 코드.
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
          <div
            className="d-flex bg-light overflow-auto  border border-dark rounded mb-1 mr-1"
            id="ProceduresPannel"
          >
            <ul className="list-group">
              <li className="list-group-item list-group-item-success">
                0. 장비 연결 테스트
              </li>
              {this.state.procedureList}
            </ul>
          </div>
          <div
            id="ChattingPannel"
            className="d-flex flex-column bg-light overflow-auto border border-dark rounded mb-1"
          >
            <div className="msg_history">
              {this.state.messageHistory}
              <div ref={this.divRef} />
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  onChange={this.onInputChanged}
                  onKeyPress={this.onKeyPress}
                  value={this.state.messageInput}
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                />
              </div>
            </div>
            <button
              className="d-flex-inline align-items-end btn-dark"
              type="button"
              onClick={this.sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      );
    } else {
      // 측정을 시작하지 않았을 때
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
        <div
          className="d-flex align-items-center p-5 border border-dark rounded mb-1 text-muted"
          style={{ fontSize: '12px' }}
          id="RightPannel"
        >
          상단에 있는 사용자와 작업을 선택한 뒤에 측정시작 버튼을 눌러주세요.
        </div>
      );
    }
  }
}

export default RightPannel;
