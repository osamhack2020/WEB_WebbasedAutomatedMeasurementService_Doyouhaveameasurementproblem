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
      users: null,
      user_list: [],
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  // componentDidMount() {
  //   axios
  //     .get('https://express-server.run.goorm.io/user/getUsers')
  //     .then((res) => res.data)
  //     .then((data) => {
  //       //data.forEach((data) => console.log(data));
  //       this.setState({ users: data });
  //     });
  // }
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
          this.props.onLogin(
            tmp.idusers,
            tmp.name,
            tmp.region,
            tmp.isAdmin,
            tmp.rank,
          );
          alert('로그인 성공');
        } else {
          console.log('로그인 실패 in login.js');
          alert('Id와 Password를 확인해주세요');
          this.props.onLogin(null, null, null, null, null);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(' Error 로그인 실패');
      });
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

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
      <div className=" d-flex flex-column align-items-center">
        <form className="d-flex flex-column form-signin">
          <h1 className=" d-flex h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="d-flex sr-only">
            아이디
          </label>
          <input
            type="id"
            id="inputEmail"
            name="id"
            className="d-flex form-control"
            placeholder="id"
            required
            autoFocus
            value={this.state.id}
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className=" d-flex sr-only">
            비밀번호
          </label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="d-flex form-control"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="d-flex checkbox ">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>{' '}
          <button
            className="d-flex btn btn-lg btn-primary btn-block"
            type="button"
            onClick={this.onClickHandler}
          >
            로그인
          </button>
          <button
            className="d-flex btn btn-lg btn-primary btn-block"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            회원가입
          </button>
          <p className="d-flextext-muted">&copy; 2020 OSAM 너 측정 문제있어?</p>
        </form>

        <Register onLogin={this.props.onLogin} id="exampleModal" className="" />

        {/* <div>
          현재 유져 정보:
          <ul>{list_items}</ul>
        </div> */}
      </div>
    );
  }
}

export default Login;
