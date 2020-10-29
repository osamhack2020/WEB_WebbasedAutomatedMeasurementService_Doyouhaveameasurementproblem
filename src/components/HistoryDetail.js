import React, { Component } from 'react';
import axios from 'axios';
class HistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProcedure: this.props.selectedProcedure,
      selectedProcedureContent: null,
      procedures: null,
      vals:[],
      units:[],
    };
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/procedure/getProcedures',
      data: {},
    })
      .then((response) => {
        this.setState({
          procedures: response.data,
        });
        //console.log(response.data);
        this.state.procedures.forEach((element) => {
          if (element.title === this.state.selectedProcedure) {
            this.setState({ selectedProcedureContent: element });
          }
        });
        this.state.vals = this.state.selectedProcedureContent.test_vals.split(' ');
        this.state.units =  this.state.selectedProcedureContent.test_units.split(' ');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var results = this.state.result.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{this.state.vals[index] + this.state.units[index]}</td>
          <td>{this.selectedProcedureContent.result[index]}</td>
          <td>{Math.abs(this.state.vals[index] - this.selectedProcedureContent.result[index])}</td>
          <td>pass</td>
        </tr>
      );
    });

    return (
      <div
        className="modal fade"
        id="historyDetail"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="historyDetail"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="procedureFinished">
                {'작업' +
                  this.props.selectedProcedure +
                  '승인 부대: ' +
                  this.props.adminRegion +
                  '계급: ' +
                  this.props.adminRank +
                  '이름' +
                  this.props.adminName +
                  '시간' +
                  this.props.nowDate}
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
                className="btn btn-primary"
                data-dismiss="modal"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryDetail;
