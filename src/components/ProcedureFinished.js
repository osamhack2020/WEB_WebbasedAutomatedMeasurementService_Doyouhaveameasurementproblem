import React, { Component } from 'react';

class ProcedureFinished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.result,
      userId: this.props.userId,
      adminName: this.props.adminName,
      adminRegion: this.props.adminRegion,
      adminRank: this.props.adminRank,
    };
  }

  render() {
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
                2020-10-09
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
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                  </tr>
                </tbody>
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

export default ProcedureFinished;
