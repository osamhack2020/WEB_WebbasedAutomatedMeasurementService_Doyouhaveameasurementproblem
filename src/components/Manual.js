import React, { Component } from 'react';
import '../css/Manual.css';
// 장비의 연결 방법을 알려주는 Modal Component
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
                Device Manual
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
              <div
                id="carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <h5 className="modal-title" id="exampleModalLabel">
                      1. 직류전압 측정 연결 단자{' '}
                    </h5>
                    <img
                      src={process.env.PUBLIC_URL + '/DCV_measure_.jpg'}
                      className="img-fluid"
                      alt="image1"
                    />
                  </div>
                  <div className="carousel-item">
                    <h5 className="modal-title" id="exampleModalLabel">
                      2. 교류전압 측정 연결 단자{' '}
                    </h5>
                    <img
                      src={process.env.PUBLIC_URL + '/ACV_measure_.jpg'}
                      className="img-fluid"
                      alt="image2"
                    />
                  </div>
                  <div className="carousel-item">
                    <h5 className="modal-title" id="exampleModalLabel">
                      3. 2W 저항 측정 연결 단자{' '}
                    </h5>
                    <img
                      src={process.env.PUBLIC_URL + '/RES_measure_.jpg'}
                      className="img-fluid"
                      alt="image3"
                    />
                  </div>
                  <div className="carousel-item">
                    <h5 className="modal-title" id="exampleModalLabel">
                      4. 주파수 측정 연결 단자{' '}
                    </h5>
                    <img
                      src={process.env.PUBLIC_URL + '/FREQ_measure_.jpg'}
                      className="img-fluid"
                      alt="image4"
                    />
                  </div>
                  <div className="carousel-item">
                    <h5 className="modal-title" id="exampleModalLabel">
                      5. 주기 측정 연결 단자{' '}
                    </h5>
                    <img
                      src={process.env.PUBLIC_URL + '/PER_measure_.jpg'}
                      className="img-fluid"
                      alt="image5"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carousel"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">이전</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carousel"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">다음</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manual;
