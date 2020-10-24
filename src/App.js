import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import './App.css';
import Admin34401a from './components/Admin34401a';
import Login from './components/Login';
import Admin from './components/User';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: cookie.load('idusers'),
      name: '',
      region: '',
      isAdmin: cookie.load('isAdmin'),
      rank: '',
      api_test: '',
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:2020/')
      .then((res) => res.data)
      .then((data) => this.setState({ api_test: data.value }));
  }
  onLogin(idusers, isAdmin) {
    this.setState({
      idusers: idusers,
      isAdmin: isAdmin,
    });
    cookie.save('idusers', idusers, {
      maxAge: 1000,
    });
    cookie.save('isAdmin', isAdmin, {
      maxAge: 1000,
    });
  }

  onLogout() {
    this.setState({
      idusers: '',
    });
    cookie.remove('idusers');
    cookie.remove('isAdmin');
  }
  render() {
    if (!this.state.idusers) {
      return <Login onLogin={this.onLogin.bind(this)} />;
    } else {
      if (this.state.isAdmin === 1 || this.state.isAdmin === '1') {
        return (
          <Admin34401a
            idusers={this.state.idusers}
            isAdmin={this.state.isAdmin}
            onLogout={this.onLogout.bind(this)}
          />
        );
      } else {
        return (
          <Admin
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
