import React, { Component } from 'react';
import axios from 'axios';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
import Plot from 'react-plotly.js';
import cookie from 'react-cookies';

class Admin34401a extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      idusers: this.props.idusers,
      isAdmin: cookie.load('isAdmin'),
      users: null,
      user_list: [],
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
      data: [
        {
          y: [],
          type: 'chart',
          mode: 'lines+markers',
          marker: { color: 'green' },
        },
      ],
      layout: {
        autosize: false,
        width: 1240,
        height: 450,
        xaxis: {
          range: [0, 30],
          title: {
            text: 'time',
            font: {
              family: 'Arial',
              size: 12,
            },
          },
        },
        yaxis: {
          autorange: true,
          text: '',
        },
        plot_bgcolor: 'black',
        title: {
          text: 'history',
          font: {
            family: 'Arial',
            size: 24,
          },
        },
      },
      frames: [],
      config: {},
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
    });
  };
  onSelectBoxChanged1 = (event) => {
    this.setState({ selectedId: event.target.value });
  };
  onSelectBoxChanged2 = (event) => {
    this.setState({ selectedProcedure: event.target.value });
  };
  handleClick = (path) => () => {
    if (path === '') {
      alert('쿼리를 형식에 맞게 입력해주세요');
      return;
    }

    this.fetchData(path);
    if (path.match('volt') !== null) {
      this.setState({ unit: 'V' });
    } else if (path.match('curr') !== null) {
      this.setState({ unit: 'V' });
    } else if (path.match('res') !== null) {
      this.setState({ unit: 'Ω' });
    } else if (path.match('freq') !== null) {
      this.setState({ unit: 'KHz' });
    } else if (path.match('per') !== null) {
      this.setState({ unit: 'sec' });
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
          console.log(response.data);
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
    var list_items;
    if (this.state.users !== null) {
      list_items = this.state.users.map((data) => (
        <option key={data.idusers}>
          {'ID:' + data.idusers + '  이름:' + data.name}
        </option>
      ));
    }
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="flex-row m-2">
          <div className="d-flex-inline">
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
        </div>
        <div className="flex-row">
          <label className="d-flex-inline" htmlFor="exampleFormControlSelect1">
            사용자 선택
          </label>
          <select
            onChange={this.onSelectBoxChanged1}
            value={this.state.selectedId}
            className="d-flex-inline "
            id="exampleFormControlSelect1"
          >
            <option value="" defaultValue disabled hidden>
              아이디
            </option>

            {list_items}
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
            className="d-flex-inline"
            id="exampleFormControlSelect1"
          >
            <option value="" defaultValue disabled hidden>
              작업
            </option>
            <option>test1</option>
            <option>test2</option>
            <option>test3</option>
            <option>test4</option>
            <option>test5</option>
          </select>
          <button
            className="d-flex-inline ml-2"
            onClick={this.handleStartMeasuring}
          >
            측정 시작
          </button>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <LeftPannel
            connected={this.state.connected}
            id={this.state.selectedId}
            procedure={this.state.selectedProcedure}
            unit={this.state.unit}
            value={this.state.value}
            onClick={this.handleClick}
            onClear={this.handleClear}
          />
          <RightPannel
            connected={this.state.connected}
            id={this.state.selectedId}
            procedure={this.state.selectedProcedure}
          />
        </div>
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          frames={this.state.frames}
          config={this.state.config}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default Admin34401a;
