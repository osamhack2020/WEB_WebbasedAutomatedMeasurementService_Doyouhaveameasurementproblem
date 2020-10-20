import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
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
      <div className="d-flex flex-column align-items-center">
        Admin.js
        <button onClick={this.props.onLogout}>로그아웃</button>
        <div>
          현재 유져 정보:
          <ul>{list_items}</ul>
        </div>
      </div>
    );
  }
}

export default Admin;
