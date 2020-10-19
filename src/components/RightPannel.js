import React, { Component } from 'react';
import '../css/RightPannel.css';

class RightPannel extends Component {
  render() {
    return (
      <div
        id="RightPannel"
        className="d-flex flex-column align-items-stretch bg-light border border-secondary"
      >
        <div className="d-flex align-items-start">
          <ul
            className="d-flex flex-row nav nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="d-flex nav-item" role="presentation">
              <a
                className="d-flex nav-link active"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                작업자
              </a>
            </li>
            <li className="d-flex nav-item" role="presentation">
              <a
                className="nav-link"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                측정절차
              </a>
            </li>

            <li className="d-flex nav-item" role="presentation">
              <a
                className="d-flex nav-link"
                id="info-tab"
                data-toggle="tab"
                href="#info"
                role="tab"
                aria-controls="info"
                aria-selected="false"
              >
                info
              </a>
            </li>
          </ul>
        </div>
        <div
          className="d-flex align-items-stretch tab-content m-3"
          id="myTabContent"
        >
          <div
            className="tab-pane fade "
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {/* 여기서 사용한 변수명은 구굴시트에 procedure에 명시 전체 DB에서 가져오게끔 템플릿 필요 */}
            <ul className="list-group">
              <li className="list-group-item">
                <tr>
                  <td>"$num"</td>
                  <td>"$title"</td>
                  <td>"$contents"</td>
                  <td>"$lowValue"</td>
                  <td>"$measurementValue</td>
                  {/* 여기서 measurementValue은 low 와 high와 비교되어야 하며 비교된 값이 result에 
                       PASS / FAIL 표시 */}
                  <td>"$highValue"</td>
                  <td>"$result</td>
                </tr></li>
              <li className="list-group-item">2. Dapibus ac facilisis in</li>
              <li className="list-group-item">3. Morbi leo risus</li>
              <li className="list-group-item">4. Porta ac consectetur ac</li>
              <li className="list-group-item">5. Vestibulum at eros</li>
            </ul>
          </div>
          <div
            className="tab-pane fade show active"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <ul className="unstyled-list p1">
              <li className="">작업자: OOO</li>
              <li className="">소속 부대: OOO</li>
              <li className="">
                작업내용:
                <ul className="">
                  <li className="">1. Cras justo odio</li>
                  <li className="">2. Dapibus ac facilisis in</li>
                  <li className="">3. Morbi leo risus</li>
                  <li className="">4. Porta ac consectetur ac</li>
                  <li className="">5. Vestibulum at eros</li>
                </ul>
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="info"
            role="tabpanel"
            aria-labelledby="info-tab"
          ></div>
        </div>
      </div>
    );
  }
}

export default RightPannel;
