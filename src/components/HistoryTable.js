import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../css/HistoryTable.css';
// react-bootstrap-table module을 통해 만들어진 테이블을 반환하는 컴포넌트
class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRowClicked = this.onRowClicked.bind(this);
  }
  onRowClicked(e, row, rowIndex) {
    console.log(this.props.history[rowIndex].result);
    alert(this.props.history[rowIndex].result);
  }
  render() {
    var historyItems;
    const rowEvents = {
      onClick: this.onRowClicked,
    };
    const columns = [
      {
        width: '500px',
        dataField: 'index',
        text: 'index',
      },
      {
        dataField: 'selectedProcedure',
        text: '작업',
      },
      {
        dataField: 'adminRegion',
        text: '부대',
      },
      {
        dataField: 'adminRank',
        text: '계급',
      },
      {
        dataField: 'adminName',
        text: '이름',
      },
      {
        dataField: 'nowDate',
        text: '시간',
      },
    ];
    // History props에 histoy가 담겨있을 때
    if (this.props.history) {
      historyItems = this.props.history.map((data, index) => {
        return {
          index: index,
          selectedProcedure: data.selectedProcedure,
          adminRegion: data.adminRegion,
          adminRank: data.adminRank,
          adminName: data.adminName,
          nowDate: data.nowDate,
        };
      });
      //var result = this.props.history.result.split(' ');
      return (
        <div
          className="modal fade"
          id="history"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.props.idusers + '님의 최근 측정 내역입니다.'}
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
                <div id="bootstrapTable">
                  <BootstrapTable
                    hover
                    keyField="index"
                    data={historyItems}
                    columns={columns}
                    rowEvents={rowEvents}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>측정 기록이 없습니다.</p>;
    }
  }
}

export default HistoryTable;
