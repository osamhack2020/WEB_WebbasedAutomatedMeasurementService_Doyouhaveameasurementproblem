import React, { Component } from 'react';

class Manual extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="manual"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                장비 Manual
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
              <img
                src={process.env.PUBLIC_URL + '/ACV_measure_.jpg'}
                class="img-fluid"
                alt="image1"
              />
              <img
                src={process.env.PUBLIC_URL + '/DCV_measure_.jpg'}
                class="img-fluid"
                alt="image2"
              />
              <img
                src={process.env.PUBLIC_URL + '/RES_measure_.jpg'}
                class="img-fluid"
                alt="image3"
              />
              <img
                src={process.env.PUBLIC_URL + '/FREQ_measure_.jpg'}
                class="img-fluid"
                alt="image4"
              />
              <img
                src={process.env.PUBLIC_URL + '/PER_measure_.jpg'}
                class="img-fluid"
                alt="image5"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={this.handleClick}
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

export default Manual;
