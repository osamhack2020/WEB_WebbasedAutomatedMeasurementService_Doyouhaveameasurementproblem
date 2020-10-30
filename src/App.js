import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import './App.css';
import Admin34401a from './components/Admin34401a';
import Login from './components/Login';
import User from './components/User';

// 로그인 세션(쿠키) 관리 및 라우터 기능 컴포넌트
class App extends Component {
  constructor(props) {
    super(props);
    // idusers라는 쿠키, isAdmin 쿠키를 불러옴
    this.state = {
      idusers: cookie.load('idusers'),
      name: '',
      region: '',
      isAdmin: cookie.load('isAdmin'),
      rank: '',
      api_test: '',
    };
  }
  // rest-api server에 접속 가능한지 테스트
  componentDidMount() {
    axios
      .get('https://express-server.run.goorm.io/')
      .then((res) => res.data)
      .then((data) => this.setState({ api_test: data.value }));
  }
  // 로그인 되었을 때 발생하는 이벤트 핸들러
  onLogin(idusers, isAdmin) {
    // state update
    this.setState({
      idusers: idusers,
      isAdmin: isAdmin,
    });
    // 쿠키 저장 (생존시간 1000초 == 약 17분)
    cookie.save('idusers', idusers, {
      maxAge: 1000,
    });
    cookie.save('isAdmin', isAdmin, {
      maxAge: 1000,
    });
  }
  // 로그아웃 되었을 때 발생하는 이벤트 핸들러
  onLogout() {
    this.setState({
      idusers: '',
    });
    // 쿠키 제거
    cookie.remove('idusers');
    cookie.remove('isAdmin');
  }
  render() {
    // 만약 idusers에 담긴 값이 없다면 로그인 화면으로 돌아가기
    if (!this.state.idusers) {
      return <Login onLogin={this.onLogin.bind(this)} />;
    } else {
      // admin 계정이라면 Admin3401a 화면으로
      if (this.state.isAdmin === 1 || this.state.isAdmin === '1') {
        return (
          <Admin34401a
            idusers={this.state.idusers}
            isAdmin={this.state.isAdmin}
            onLogout={this.onLogout.bind(this)}
          />
        );
      } else {
        //그렇지 않다면, 일반 user 계정이라면 User화면으로
        return (
          <User
            idusers={this.state.idusers}
            isAdmin={this.state.isAdmin}
            onLogout={this.onLogout.bind(this)}
          />
        );
      }
    }
  }
}

export default App;
