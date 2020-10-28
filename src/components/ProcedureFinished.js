import React, { Component } from 'react';
import axios from 'axios';
class ProcedureFinished extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    var nowDate =
      d.getFullYear() +
      '/' +
      (d.getMonth() + 1) +
      '/' +
      d.getDate() +
      '/' +
      d.getHours() +
      '시' +
      d.getMinutes() +
      '분' +
      d.getSeconds() +
      '초';
    this.state = {
      nowDate: nowDate,
      vals: this.props.vals,
      result: this.props.result,
      userId: this.props.userId,
      adminName: this.props.adminName,
      adminRegion: this.props.adminRegion,
      adminRank: this.props.adminRank,
      selectedProcedure: this.props.selectedProcedure,
    };
    this.postHistory = this.postHistory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async postHistory() {
    var result = this.state.result.join(' ');
    //console.log('hi');
    return await axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/history/postHistory',
      data: {
        selectedProcedure: this.state.selectedProcedure,
        nowDate: this.state.nowDate,
        result: result,
        userId: this.state.userId,
        adminName: this.state.adminName,
        adminRegion: this.state.adminRegion,
        adminRank: this.state.adminRank,
      },
    })
      .then(function (response) {
        console.log(response);
        //this.props.plusOneCurrentIndex();
        alert('측정 기록이 저장되었습니다');
      })
      .catch(function (error) {
        console.log(error);
        //this.props.plusOneCurrentIndex();
      });
  }
  handleClick() {
    this.postHistory();
    this.props.plusOneCurrentIndex();
    this.props.handleStopMeasuring();
  }

  render() {
    var results = this.state.result.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{this.state.vals[index]}</td>
          <td>{data}</td>
          <td>{Math.abs(this.state.vals[index] - data)}</td>
          <td>pass</td>
        </tr>
      );
    });

    return (
      <div
        className="modal fade"
        id="procedureFinished"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="procedureFinished"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="procedureFinished">
                {'작업' +
                  this.state.selectedProcedure +
                  'User: ' +
                  this.state.userId +
                  'Amdin: ' +
                  this.state.adminName +
                  ' ' +
                  this.state.adminRegion +
                  ' ' +
                  this.state.adminRank}
              </h5>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">목표값</th>
                    <th scope="col">측정값</th>
                    <th scope="col">오차</th>
                    <th scope="col">결과</th>
                  </tr>
                </thead>
                <tbody>{results}</tbody>
              </table>
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
                className="btn btn-dark"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProcedureFinished;
