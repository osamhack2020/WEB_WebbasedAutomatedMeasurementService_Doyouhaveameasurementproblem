import React, { Component } from 'react';
import '../css/Chart.css';
import { Chart } from 'react-charts';
class Chart extends Component {
  render() {
    return (
      <div className="d-flex">
        <canvas
          style="border-radius: 1em"
          class="d-flex bg-light mt-3"
          id="myChart"
        ></canvas>
      </div>
    );
  }
}

export default Chart;
