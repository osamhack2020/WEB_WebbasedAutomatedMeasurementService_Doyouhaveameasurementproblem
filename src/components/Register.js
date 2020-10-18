import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      name: '',
      region: '',
      rank: '',
    };
  }
  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    this.register();
  };
  async register() {
    return await axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/user/register',
      data: {
        idusers: this.state.id,
        password: this.state.password,
        name: this.state.name,
        region: this.state.region,
        rank: this.state.rank,
      },
    })
      .then(function (response) {
        console.log('회원가입 성공');
        return <Link to="/"></Link>;
      })
      .catch(function (error) {
        console.log(error);
        prompt('회원가입 실패');
      });
  }
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">군번</label>
            <input
              type="id"
              name="id"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="id"
              value={this.state.id}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">패스워드</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">이름</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="exampleInputName1"
              placeholder=""
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputRegion1">부대</label>
            <input
              type="text"
              name="region"
              className="form-control"
              id="exampleInputRegion1"
              placeholder=""
              value={this.state.region}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputRank1">계급</label>
            <input
              type="text"
              name="rank"
              className="form-control"
              id="exampleInputRank1"
              placeholder=""
              value={this.state.rank}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            onClick={this.handleClick}
            className="btn btn-primary"
          >
            회원가입
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
