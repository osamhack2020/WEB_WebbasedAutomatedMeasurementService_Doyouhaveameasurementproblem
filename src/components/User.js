import React, { Component } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import '../css/User.css';
import cookie from 'react-cookies';
import Manual from '../components/Manual';
import Chatting from '../components/Chatting';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: this.props.idusers,
      isAdmin: cookie.load('isAdmin'),
    };
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center bg-light">
        User.js 장비를 직접 측정하는 사용자의 화면입니다.
        <div className="topPannel flex-row  mt-4">
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
          <div className="d-sm-inline-flex ml-4">관리자 접속여부: admin</div>
          <BsCircleFill
            className="d-sm-inline-flex ml-1"
            style={{ color: 'green' }}
          />
        </div>
        <Manual className="m-4" id="manual" />
        <div className="mt-4">진행률</div>
        <div className="d-block w-50">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: '25%' }}
            >
              25%
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-stretch mt-4">
          <Chatting />
          <ul class="list-group">
            <li class="list-group-item list-group-item-success">
              0. 장비 연결 테스트
            </li>
            <li class="list-group-item list-group-item-success">
              1. 전압 DC 5V 테스트
            </li>
            <li class="list-group-item list-group-item-secondary">
              2. 전류 20A 테스트
            </li>
            <li class="list-group-item ">3. 주파수 10KHz 테스트</li>
            <li class="list-group-item ">4. 주기 0.005 sec 테스트</li>
            <li class="list-group-item ">5. 저항 10Ω 테스트</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default User;
