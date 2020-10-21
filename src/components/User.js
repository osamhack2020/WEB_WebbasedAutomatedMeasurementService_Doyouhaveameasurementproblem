import React, { Component } from 'react';
import axios from 'axios';
import '../css/User.css';
import cookie from 'react-cookies';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      user_list: [],
      idusers: this.props.idusers,
      isAdmin: cookie.load('isAdmin'),
    };
  }
  componentDidMount() {
    axios
      .get('https://express-server.run.goorm.io/user/getUsers')
      .then((res) => res.data)
      .then((data) => {
        //data.forEach((data) => console.log(data));
        this.setState({ users: data });
      });
  }

  render() {
    var list_items;
    if (this.state.users !== null) {
      list_items = this.state.users.map((data) => (
        <option key={data.idusers}>
          {'ID:' + data.idusers + '  이름:' + data.name}
        </option>
      ));
    }
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
