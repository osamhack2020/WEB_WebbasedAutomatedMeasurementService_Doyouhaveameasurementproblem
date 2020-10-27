import React, { Component } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Register from './Register';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  onClickHandler() {
    this.login();
  }
  async login() {
    return await axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/user/login',
      data: {
        idusers: this.state.id,
        password: this.state.password,
      },
    })
      .then((response) => {
        if (response.data.loginsuccess) {
          console.log('로그인 성공 in login.js');
          console.log(response.data);
          const tmp = response.data;
          this.props.onLogin(tmp.idusers, tmp.isAdmin);
          alert('로그인 성공');
        } else {
          console.log('로그인 실패 in login.js');
          alert('Id와 Password를 확인해주세요');
          this.props.onLogin('', 0);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(' Error 로그인 실패');
      });
  }

  handleChange = (e) => {
    //console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="align-items-center align-content-center" id="loginComponent">
        <form className="form-signin" id="loginForm">
          <h1 className=" h3 mb-4 text-left font-weight-normal">
            Please sign in
          </h1>
          <label htmlFor="inputEmail" className="sr-only">
            아이디
          </label>
          <input
            type="id"
            id="inputEmail"
            name="id"
            className="custom form-control"
            placeholder="id"
            required
            autoFocus
            value={this.state.id}
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            비밀번호
          </label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="custom mb-2 mt-2 form-control"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <select id="orederProcedure" className="custom form-control">
            <option value="" disabled>
              장비 선택
            </option>
            <option>34401a</option>
          </select>
          <button
            className=" btn custom text-center font-weight-bold mt-5 mb-2 btn-dark btn-block"
            type="button"
            onClick={this.onClickHandler}
          >
            로그인
          </button>
          <button
            className="btn custom btn-dark font-weight-bold btn-block"
            type="button"
            data-toggle="modal"
            data-target="#registerModal"
          >
            회원가입
          </button>
          {/* <p className="d-flextext-muted">
            &copy; 2020 OSAM 너 측정 문제 있어?
          </p> */}
          {/* <div className="mt-5">
            측정자: ID:<b>test</b> PW: <b>1234</b>
          </div>
          <div>
            관리자: ID:<b>admin</b> PW: <b>1234</b>
          </div> */}
        </form>

        <Register
          onLogin={this.props.onLogin}
          id="registerModal"
          className=""
        />
      </div>
    );
  }
}

export default Login;
