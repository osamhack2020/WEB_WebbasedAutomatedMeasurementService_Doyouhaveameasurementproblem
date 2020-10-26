/* eslint-disable */
import React, { Component } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap';
import '../css/User.css';
import UserLeftPannel from './UesrLeftPannel';
import cookie from 'react-cookies';
import io from 'socket.io-client';
import Manual from '../components/Manual';
// import Chatting from '../components/Chatting';
const socket = io.connect('https://express-server.run.goorm.io');

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: this.props.idusers,
      isAdmin: cookie.load('isAdmin'),
      messageInput: '',
      messageHistory: [],
      procedures: null,
    };
    socket.on('message to user', (message) => {
      console.log(message);
      var tmp = this.state.messageHistory.concat(
        <div className="incoming_msg">
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>ID: amdin</p>
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
    console.log('sendMessage');
    socket.emit('send message from user', {
      id: this.state.idusers,
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
    return (
      <div className="d-flex flex-column align-items-center justify-content-center bg-light">
        User.js 장비를 직접 측정하는 사용자의 화면입니다.
            <div className="topPannel flex-row  mt-4 bg-secondary">
              <button className=" btn-sm p-2 mr-4" onClick={this.props.onLogout}>
                로그아웃
              </button>
              <button
                className="btn-sm p-2"
                type="button"
                data-toggle="modal"
                data-target="#manual"
              >
                연결 방법 자세히 보기
              </button>
              <div className="d-sm-inline-flex ml-4 text-white-50">관리자 접속여부: admin</div>
              <BsCircleFill
                className="d-sm-inline-flex ml-1"
                style={{ color: 'green' }}
              />
            </div>
        
        
        <div className="d-flex flex-row">
          <div className="d-flex flex-column w-75">
              <Manual className="m-4" id="manual" />
              <div className="mt-4">진행률</div>
                <div className="d-block">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: '25%' }}
                    > 25%
                    </div>
                  </div>
              </div>
              <div className="d-flex flex-column overflow-auto">
                  <UserLeftPannel></UserLeftPannel>
              </div>          
            </div>   


          <div className="d-flex flex-column w-25 p-1" style={{width:30+'em'}, {height:20+'em'}}>
            <ul class="list-group"></ul>
              <div
                  id="ChattingPannel"
                  className="d-flex flex-column bg-light overflow-auto"
              >
                <div className="msg_history rounded-lg p-1" style={{width:30+'em'},{height:40+'em'}} >{this.state.messageHistory}</div>
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
                  > Send
                  </button>
                </div>
              </div>
          </div>
      </div>
    );
  }
}

export default User;
