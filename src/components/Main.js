import React, { Component } from 'react';
import axios from 'axios';
import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
import Plot from 'react-plotly.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      unit: 'DC',
      value: null,
      timer: false,
      timer_period: 1,
      data: [
        {
          y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          type: 'chart',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ],
      layout: {
        xaxis: {
          range: [0, 10],
        },
      },
      frames: [],
      config: {},
    };
  }
  handleClick = (path) => () => {
    this.fetchData(path);
    if (path.match('ac*')) {
      this.setState({ unit: 'AC' });
    } else if (path.match('dc*')) {
      this.setState({ unit: 'DC' });
    } else {
      this.setState({ unit: '' });
    }
    //console.log(this.state.value);
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
