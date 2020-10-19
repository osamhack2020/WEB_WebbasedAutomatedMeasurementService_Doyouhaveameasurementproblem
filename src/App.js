import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import './App.css';
import Main from './components/Main';
import Login from './components/Login';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: cookie.load('idusers'),
      name: '',
      region: '',
      isAdmin: 0,
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
  onLogin(idusers,  isAdmin) {
    this.setState({
      idusers: idusers,
      isAdmin: isAdmin,
    });
    cookie.save('idusers', idusers, {
      maxAge: 180,
    });
  }

  onLogout() {
    this.setState({
      idusers: '',
    });
    cookie.remove('idusers');
  }
  render() {
    if (!this.state.idusers) {
      return <Login onLogin={this.onLogin.bind(this)} />;
    }
    return (
      <Main
        idusers={this.state.idusers}
        isAdmin={this.state.isAdmin}
        onLogout={this.onLogout.bind(this)}
      />
    );
  }
}

export default App;
