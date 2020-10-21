import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      name: '',
      region: '',
      rank: '',
      idIsvalid: false,
      passwordIsvalid: false,
      nameIsvalid: false,
      regionIsvalid: false,
      rankIsvalid: false,
    };
  }
  handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.value.length > 1) {
      this.setState({ [e.target.name + 'Isvalid']: true });
    } else {
      this.setState({ [e.target.name + 'Isvalid']: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    this.register();
  };

  inputClassNameHelper = (boolean) => {
    switch (boolean) {
      case true:
        return 'is-valid';
      case false:
        return 'is-invalid';
      default:
        return '';
    }
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
        isAdmin: 0,
        rank: this.state.rank,
      },
    })
      .then(function (response) {
        if (response.data.registersuccess) {
          console.log('회원가입 성공 in register.js');
          alert('회원가입 성공');
        } else {
          console.log('회원가입 실패 in register.js');
          alert('회원가입 실패');
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('회원가입 실패');
      });
  }

  render() {
    return (
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                회원가입
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="idusers" className="col-form-label">
                    군번:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${this.inputClassNameHelper(
                      this.state.idIsvalid,
                    )}`}
                    id="idusers"
                    name="id"
                    value={this.state.id}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    비밀번호:
                  </label>
                  <input
                    type="password"
                    className={`form-control  ${this.inputClassNameHelper(
                      this.state.passwordIsvalid,
                    )}`}
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="col-form-label">
                    이름:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${this.inputClassNameHelper(
                      this.state.nameIsvalid,
                    )}`}
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="region" className="col-form-label">
                    부대:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${this.inputClassNameHelper(
                      this.state.regionIsvalid,
                    )}`}
                    id="region"
                    name="region"
                    value={this.state.region}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rank" className="col-form-label">
                    계급:
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${this.inputClassNameHelper(
                      this.state.rankIsvalid,
                    )}`}
                    name="rank"
                    id="rank"
                    value={this.state.rank}
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                onClick={this.handleClick}
                className="btn btn-primary"
                data-dismiss="modal"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
