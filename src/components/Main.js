import React, { Component } from 'react';
import axios from 'axios';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
import Plot from 'react-plotly.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      idusers: this.props.idusers,
      isAdmin: this.props.isAdmin,
      name: '',
      rank: '',
      region: '',
      curr: 'DC',
      unit: '',
      value: '0.000',
      mean: 0,
      timer: false,
      timer_period: 1,
      data: [
        {
          y: [],
          type: 'chart',
          mode: 'lines+markers',
          marker: { color: 'green' },
        },
      ],
      layout: {
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

  handleClear = () => {
    const data_ = this.state.data.slice(undefined);
    data_[0].y = [];
    this.setState({ data: data_, value: 0, unit: '' });
  };
  handleGetUserInfo = () => {
    this.fetchUserInfo();
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
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <button onClick={this.handleGetUserInfo}>정보 가져오기</button>
        <button onClick={this.props.onLogout}>로그아웃</button>
        <div className="d-flex">
          <div className="">{'아이디 :' + this.state.idusers}</div>
          <div className="">{'  이름:' + this.state.name}</div>
          <div className="">{'  소속부대:' + this.state.region}</div>
          <div className="">{'  계급:' + this.state.rank}</div>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <LeftPannel
            unit={this.state.unit}
            value={this.state.value}
            onClick={this.handleClick}
            onClear={this.handleClear}
          />
          <RightPannel />
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

export default Main;
