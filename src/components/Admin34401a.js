import React, { Component } from 'react';
import axios from 'axios';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
import Plot from 'react-plotly.js';
import cookie from 'react-cookies';
import '../css/Admin34401a.css';

class Admin34401a extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      idusers: this.props.idusers,
      isAdmin: cookie.load('isAdmin'),
      users: null,
      num: '',
      name: '',
      rank: '',
      region: '',
      curr: 'DC',
      unit: '',
      value: '0.000',
      mean: 0,
      timer: false,
      timer_period: 1,
      connected: '',
      selectedId: '',
      selectedProcedure: '',
      selectedProcedureContent: null,
      procedures: null,
      startProcedure: false,
      data: [
        {
          y: [],
          type: 'chart',
          mode: 'lines+markers',
          marker: { color: '#17A2B8' },
        },
      ],
      layout: {
        autosize: true,
        width: 1100,
        // height: 450,
        margin: {
          l: 25,
          r: 25,
          b: 22,
          t: 40,
        },
        xaxis: {
          range: [0, 30],
          tickfont: {
            color: '#FFFFFF',
            size: 15,
          },
        },
        yaxis: {
          autorange: true,
          tickfont: {
            color: '#FFFFFF',
            size: 15,
          },
          text: '',
        },
        plot_bgcolor: '#343A40',
        paper_bgcolor: '#6C757D',
        title: {
          text: 'history',
          font: {
            family: 'Arial',
            size: 20,
            color: '#ffffff',
          },
        },
      },
      frames: [],
      config: {
        displayModeBar: true,
      },
    };
    this.fetchUserInfo();
  }
  componentDidMount() {
    axios
      .get('https://express-server.run.goorm.io/user/getUsers')
      .then((res) => res.data)
      .then((data) => {
        //data.forEach((data) => console.log(data));
        this.setState({ users: data });
      });
    axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/procedure/getProcedures',
      data: {},
    })
      .then((response) => {
        this.setState({
          procedures: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClear = () => {
    const data_ = this.state.data.slice(undefined);
    data_[0].y = [];
    this.setState({ data: data_, value: 0, unit: '' });
  };
  handleGetUserInfo = () => {
    this.fetchUserInfo();
  };
  handleStartMeasuring = () => {
    this.setState({
      connected: this.state.selectedId,
      startProcedure: true,
    });
  };
  onSelectBoxChanged1 = (event) => {
    this.setState({ selectedId: event.target.value });
  };
  onSelectBoxChanged2 = (event) => {
    this.setState({ selectedProcedure: event.target.value });
    this.state.procedures.forEach((element) => {
      if (element.title === event.target.value) {
        this.setState({ selectedProcedureContent: element });
      }
    });
  };
  handleClick = (path) => () => {
    if (path === '') {
      alert('쿼리를 형식에 맞게 입력해주세요');
      return;
    }

    this.fetchData(path);
    if (path.match('ac') !== null) {
      this.setState({ unit: 'ACV' });
    } else if (path.match('dc') !== null) {
      this.setState({ unit: 'DCV' });
    } else if (path.match('res') !== null) {
      this.setState({ unit: 'OHM' });
    } else if (path.match('freq') !== null) {
      this.setState({ unit: 'KHZ' });
    } else if (path.match('per') !== null) {
      this.setState({ unit: 'SEC' });
    } else {
      this.setState({ unit: '' });
    }

    if (path.match('ac') !== null) {
      this.setState({ curr: 'AC' });
    } else if (path.match('dc') !== null) {
      this.setState({ curr: 'DC' });
    } else {
      this.setState({ curr: '' });
    }
  };

  async fetchUserInfo() {
    return await axios({
      method: 'post',
      url: 'https://express-server.run.goorm.io/user/userinfo',
      data: {
        idusers: this.state.idusers,
      },
    })
      .then((response) => {
        if (response.data.success) {
          //console.log(response.data);
          const tmp = response.data;
          this.setState({
            name: tmp.name,
            region: tmp.region,
            rank: tmp.rank,
          });
        } else {
          console.log('사용자 정보 가져오기 실패 in Main.js');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async fetchData(path) {
    const data_ = this.state.data.slice(undefined);
    const new_array = data_[0].y.slice(undefined);
    const new_layout = { ...this.state.layout };
    return await axios
      .get('https://express-server.run.goorm.io/' + path)
      .then((res) => res.data)
      .then((res) => {
        this.setState({
          value: parseFloat(res.value),
        });
        new_array.push(res.value);
        data_[0].y = new_array;
        new_layout.xaxis.range = [new_array.length - 30, new_array.length];
        this.setState({ data: data_ });
        this.setState({ layout: new_layout });
      });
  }
  render() {
    var userlist_items;

    //.filter(img => img.src.slice(-4) != 'json').map(img => img.src);
    if (this.state.users !== null) {
      userlist_items = this.state.users
        .filter((data) => data.isAdmin === 0)
        .map((data) => (
          <option key={data.idusers}>
            {'ID:' + data.idusers + '  이름:' + data.name}
          </option>
        ));
    }
    var procedurelist_items;
    if (this.state.procedures !== null) {
      procedurelist_items = this.state.procedures.map((data) => (
        <option key={data.pid}>{data.title}</option>
      ));
    }
    //console.log(procedurelist_items);
    return (
      <div className="d-flex flex-column align-items-center" id="Admin34401a">
        <div className="flex-column float-right bg-secondary" id="userChoice">
          <label
            className="d-flex-inline btn-group-vertical"
            htmlFor="exampleFormControlSelect1"
          >
            사용자 선택
          </label>
          <select
            onChange={this.onSelectBoxChanged1}
            value={this.state.selectedId}
            className="d-flex-inline"
            id="exampleFormControlSelect1"
            disabled={this.state.startProcedure}
          >
            <option value="" defaultValue disabled hidden>
              아이디
            </option>

            {userlist_items}
          </select>
          <label
            className="d-flex-inline ml-2 "
            htmlFor="exampleFormControlSelect1"
          >
            작업 선택
          </label>
          <select
            onChange={this.onSelectBoxChanged2}
            value={this.state.selectedProcedure}
            className="d-flex-inline btn-group-vertical bg-light"
            id="exampleFormControlSelect1"
            disabled={this.state.startProcedure}
          >
            <option value="" defaultValue disabled hidden>
              작업
            </option>
            {procedurelist_items}
          </select>
          <button
            className="d-flex-inline ml-2"
            onClick={this.handleStartMeasuring}
          >
            측정 시작
          </button>
          <button className="d-flex-inline ml-2" onClick={this.props.onLogout}>
            측정 취소
          </button>
        </div>

        <div
          className="d-flex flex-row align-items-center justify-content-center"
          id="pannel"
        >
          <div className="d-flex flex-column left">
            <div className="d-flex-inline flex-column float-left p-1 bg-secondary">
              {'아이디 :' +
                this.state.idusers +
                '이름:' +
                this.state.name +
                '소속부대:' +
                this.state.region +
                '계급:' +
                this.state.rank}
              <button
                className="d-flex-inline ml-2"
                onClick={this.props.onLogout}
              >
                로그아웃
              </button>
            </div>
            <LeftPannel
              connected={this.state.connected}
              id={this.state.selectedId}
              procedure={this.state.selectedProcedure}
              unit={this.state.unit}
              value={this.state.value}
              onClick={this.handleClick}
              onClear={this.handleClear}
            />
          </div>
          <div className="d-flex flex-column right">
            <RightPannel
              value={this.state.value}
              unit={this.state.unit}
              connected={this.state.connected}
              id={this.state.selectedId}
              procedure={this.state.selectedProcedure}
              procedureContent={this.state.selectedProcedureContent}
              adminName={this.state.name}
              adminRegion={this.state.region}
              adminRank={this.state.rank}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-end border border-light rounded-lg bg-secondary">
          <Plot
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            config={this.state.config}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
          />
        </div>
      </div>
    );
  }
}

export default Admin34401a;
