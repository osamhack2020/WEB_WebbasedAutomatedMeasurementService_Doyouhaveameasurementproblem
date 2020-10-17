import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">군번</label>
            <input
              type="id"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="id"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">패스워드</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">이름</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputRegion1">부대</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputRegion1"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputRank1">계급</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputRank1"
              placeholder=""
            />
          </div>
          <Link to="/app">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
