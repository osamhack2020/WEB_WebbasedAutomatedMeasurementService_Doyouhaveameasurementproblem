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
      value: null,
      timer: false,
      timer_period: 1,
      data: [
        {
          y: [2, 6, 3],
          type: 'chart',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ],
      layout: {},
      frames: [],
      config: {},
    };
  }
  handleClick = (path) => () => {
    this.fetchData(path);
    //console.log(this.state.value);
  };
  async fetchData(path) {
    // var someProperty = { ...this.state.someProperty };
    // someProperty.flag = true;
    // this.setState({ someProperty });
    const data_ = this.state.data.slice(undefined);
    const new_array = data_[0].y.slice(undefined);
    return await axios
      .get('https://express-server.run.goorm.io/' + path)
      .then((res) => res.data)
      .then((res) => {
        this.setState({
          value: res.value,
        });
        new_array.push(res.value);
        data_[0].y = new_array;
        this.setState({ data: data_ });
      });
  }
  render() {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row justify-content-center">
          <LeftPannel value={this.state.value} onClick={this.handleClick} />
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
