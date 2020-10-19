import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idusers: null,
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
  onLogin(idusers, name, region, isAdmin, rank) {
    this.setState({
      idusers: idusers,
      name: name,
      region: region,
      isAdmin: isAdmin,
      rank: rank,
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
    if (this.state.idusers === null) {
      return <Login onLogin={this.onLogin.bind(this)} />;
    }
    return (
      <Main
        idusers={this.state.idusers}
        name={this.state.name}
        region={this.state.region}
        isAdmin={this.state.isAdmin}
        rank={this.state.rank}
        onLogout={this.onLogout.bind(this)}
      />
    );
  }
}

export default App;
