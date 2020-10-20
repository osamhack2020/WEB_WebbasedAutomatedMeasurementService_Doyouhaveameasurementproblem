import React, { Component } from 'react';
import axios from 'axios';
import '../css/Admin.css';
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
        <option key={data.idusers}>
          {'ID:' + data.idusers + '  이름:' + data.name}
        </option>
      ));
    }
    return (
      <div className="d-flex flex-column align-items-center">
        Admin.js
        <button onClick={this.props.onLogout}>로그아웃</button>
        <div className="d-flex flex-row  m-2">
          <label className="col-sm-2" htmlFor="orederProcedure">
            작업지시
          </label>
          <select
            id="orederProcedure"
            class="col-sm-3 form-control form-control-sm"
          >
            <option value="" disabled selected>
              작업자 선택하기
            </option>
            {list_items}
          </select>
          <select
            id="orederProcedure"
            class="col-sm-3 form-control form-control-sm"
          >
            <option value="" disabled selected>
              작업목록
            </option>
            <option>방공포</option>
            <option>suu-20</option>
          </select>
          <select
            id="orederProcedure"
            class="col-sm-3 form-control form-control-sm"
          >
            <option value="" disabled selected>
              기한지정(yyyy/mm/dd)
            </option>
            <option>2020년 11월 1일</option>
            <option v>2020년 11월 10일</option>
          </select>
          <button className="col-sm-2">확인</button>
        </div>
        작업 만들기
        <div className="d-flex  align-items-center">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div class="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="button" class="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Admin;
