import React, { Component } from 'react';
import axios from 'axios';
import '../css/User.css';
import cookie from 'react-cookies';

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
      <div className="d-flex flex-column align-items-center">
        User.js 장비를 직접 측정하는 사용자의 화면입니다.
        <button onClick={this.props.onLogout}>로그아웃</button>
        <div className="d-flex flex-row  m-2"></div>
      </div>
    );
  }
}

export default User;
