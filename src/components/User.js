/* eslint-disable */
import React, { Component } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import '../css/User.css';
import cookie from 'react-cookies';
import io from 'socket.io-client';
import HistoryTable from '../components/HistoryTable';
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
      history: [],
    };
    this.fetchHistoryHandler = this.fetchHistoryHandler.bind(this);
    socket.on('message to user', (message) => {
      console.log(message);
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
      var tmp = this.state.messageHistory.concat(
        <div class="d-flex justify-content-start mb-4">
          <div class="msg_cotainer">
            <p>ID: amdin</p>
            <p>{message.message}</p>
            <span class="msg_time">{nowTime}</span>
          </div>
        </div>,
      );
      this.setState({ messageHistory: tmp });
    });
  }
  componentDidMount() {
    this.fetchHistoryHandler();
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
      <div class="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
          <p>{this.state.messageInput}</p>
          <span class="msg_time_send">{nowTime}</span>
        </div>
      </div>,
    );

    //메시지 비우기, history 업데이트
    this.setState({ messageInput: '', messageHistory: tmp });
  };
  onInputChanged = (event) => {
    this.setState({ messageInput: event.target.value });
  };
  fetchHistoryHandler() {
    this.fetchHistory();
  }
  async fetchHistory() {
    return await axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/history/getHistory',
      data: {
        userId: this.state.idusers,
      },
    })
      .then((response) => {
        var tmp = response.data.slice(undefined);
        console.log(tmp);
        if (tmp) {
          //console.log('hi');
          this.setState({
            history: tmp,
          });
        } else {
          this.setState({
            history: null,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center bg-light">
        User.js 장비를 직접 측정하는 사용자의 화면입니다.
        <div className="flex-row">
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
          <div className="d-sm-inline-flex">관리자 접속여부: admin</div>
          <BsCircleFill
            className="d-sm-inline-flex ml-1"
            style={{ color: 'green' }}
          />
        </div>
        <div className="d-flex flex-row">
          {/* LeftPannel */}
          <div className="leftPannel d-flex flex-column mr-5 mt-1">
            <h1 className="display-4">Progress</h1>
            <ProgressBar animated now={45} />

            <button onClick={this.fetchHistoryHandler} type="button">
              히스토리 업데이트
            </button>
            <HistoryTable history={this.state.history} />
          </div>
          <div className="d-flex flex-column">
            <div className="card-body msg_card_body bg-secondary mt-1">
              {this.state.messageHistory}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  className="form-control type_msg"
                  placeholder="Type your message..."
                  value={this.state.messageInput}
                  onChange={this.onInputChanged}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text send_btn "
                    onClick={this.sendMessage}
                  >
                    send
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
