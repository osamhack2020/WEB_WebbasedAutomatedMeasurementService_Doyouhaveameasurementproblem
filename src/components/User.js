import React, { Component } from 'react';
import '../css/User.css';
import cookie from 'react-cookies';
import Manual from '../components/Manual';
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
      <div className="d-flex flex-column align-items-center justify-content-center">
        User.js 장비를 직접 측정하는 사용자의 화면입니다.
        <button className="d-flex" onClick={this.props.onLogout}>
          로그아웃
        </button>
        <div className="d-flex flex-row  m-2"></div>
        <button
          className="d-flex"
          type="button"
          data-toggle="modal"
          data-target="#manual"
        >
          연결 방법 자세히 보기
        </button>
        <Manual id="manual" />
      </div>
    );
  }
}

export default User;
