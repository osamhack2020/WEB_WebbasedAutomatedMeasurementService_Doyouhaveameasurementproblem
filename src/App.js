import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Admin from './components/Admin';
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
      .get('https://express-server.run.goorm.io/')
      .then((res) => res.data)
      .then((data) => this.setState({ api_test: data.value }));
  }
  onLogin(idusers, isAdmin) {
    this.setState({
      idusers: idusers,
      isAdmin: isAdmin,
    });
    cookie.save('idusers', idusers, {
      maxAge: 300,
    });
    cookie.save('isAdmin', isAdmin, {
      maxAge: 300,
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
      if (this.state.isAdmin === 1) {
        return (
          <Admin
            idusers={this.state.idusers}
            isAdmin={this.state.isAdmin}
            onLogout={this.onLogout.bind(this)}
          />
        );
      } else {
        return (
          <Main
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
