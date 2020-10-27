import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
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
        dataField: 'index',
        text: 'index',
      },
      {
        dataField: 'selectedProcedure',
        text: '작업',
      },
      {
        dataField: 'adminRegion',
        text: '승인자 부대',
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
        <div>
          <BootstrapTable
            hover
            keyField="index"
            data={historyItems}
            columns={columns}
            rowEvents={rowEvents}
          />
          {/* <HistoryDetail
          selectedProcedure
          result={result} /> */}
        </div>
      );
    } else {
      return <p>측정 기록이 없습니다.</p>;
    }
  }
}

export default HistoryTable;
