import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: '',
      api_test: '',
    };
  }

  componentDidMount() {
    axios
      .get('https://express-server.run.goorm.io/')
      .then((res) => res.data)
      .then((data) => this.setState({ api_test: data.value }));
  }
  onLogin(idusers) {
    this.setState({
      idusers: idusers,
    });
    //cookie.save('adminId',adminId, { path: '/'});
  }

  onLogout() {
    this.setState({
      idusers: '',
    });
    //cookie.remove('adminId', { path: '/'});
  }
  render() {
    if (!this.state.idusers) {
      return <Login onLogin={this.onLogin.bind(this)} />;
    }
    return (
      <Main idusers={this.state.idusers} onLogout={this.onLogout.bind(this)} />
    );
  }
}

export default App;
