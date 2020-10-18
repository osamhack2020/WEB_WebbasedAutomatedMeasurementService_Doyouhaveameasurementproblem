import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../css/Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      user_list: [],
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
        <li key={data.idusers}>
          {'ID:' + data.idusers + '    PASSWORD:' + data.password}
        </li>
      ));
    }
    return (
      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            아이디
          </label>
          <input
            type="id"
            id="inputEmail"
            className="form-control"
            placeholder="id"
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            비밀번호
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>{' '}
          <Link to="/app">
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              로그인
            </button>
          </Link>
          <Link to="/register">
            <button
              className="btn btn-lg btn-primary btn-block mt-3"
              type="submit"
            >
              회원가입
            </button>
          </Link>
          <p className="mt-5 mb-3 text-muted">
            &copy; 2020 OSAM 너 측정 문제있어?
          </p>
        </form>
        <div>
          현재 유져 정보:
          <ul>{list_items}</ul>
        </div>
      </div>
    );
  }
}

export default Login;
