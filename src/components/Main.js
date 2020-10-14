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
          range: [0, 10],
        },
        yaxis: {
          autorange: true,
        },
        plot_bgcolor: 'black',
        title: {
          text: 'history',
          font: {
            family: 'Courier New, monospace',
            size: 24,
          },
        },
      },
      frames: [],
      config: {},
    };
  }
  handleClear = () => {
    const data_ = this.state.data.slice(undefined);
    data_[0].y = [];
    this.setState({ data: data_ });
  };
  handleClick = (path) => () => {
    this.fetchData(path);
    if (path.match('volt') !== null) {
      this.setState({ unit: 'V' });
    } else if (path.match('curr') !== null) {
      this.setState({ unit: 'A' });
    } else if (path.match('res') !== null) {
      this.setState({ unit: 'Ω' });
    } else if (path.match('freq') !== null) {
      this.setState({ unit: 'Hz' });
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
  async fetchData(path) {
    const data_ = this.state.data.slice(undefined);
    const new_array = data_[0].y.slice(undefined);
    const new_layout = { ...this.state.layout };
    return await axios
      .get('https://express-server.run.goorm.io/' + path)
      .then((res) => res.data)
      .then((res) => {
        this.setState({
          value: res.value,
        });
        new_array.push(res.value);
        data_[0].y = new_array;
        new_layout.xaxis.range = [new_array.length - 10, new_array.length];
        this.setState({ data: data_ });
        this.setState({ layout: new_layout });
      });
  }
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
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
