import React, { Component } from 'react';

import '../css/Buttons.css';
class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom_url: '',
    };
  }

  handleChange = (e) => {
    this.setState({ custom_url: e.target.value });
  };
  render() {
    return (
      <div id="Buttons" className="d-flex flex-column">
        {/* <label className="d-flex text-white m-2" htmlFor="basic-url">
          사용자 지정 query
        </label>
        <div className="d-flex flex-row align-items-stretch input-group mb-3">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text" id="basic-addon3">
              https://express-server.run.goorm.io/
            </span>
          </div>
          <input
            className="d-flex"
            type="text"
            placeholder="meas/volt/dc"
            id="custom_url"
            value={this.state.custom_url}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="d-flex btn btn-light"
            onClick={this.props.onClick(this.state.custom_url)}
          >
            Submit
          </button>
        </div> */}
        <div className="d-flex flex-row align-items-strech bg-secondary justify-content-center mt-1 pl-1 pr-1">
          {/* setInterval(() => {
            
          }, interval); */}
          <div className="d-flex flex-row align-items-strech justify-content-center"></div>

          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-5"
            onClick={this.props.onClick('meas/volt/ac')}
          >
            ACV
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-2"
            onClick={this.props.onClick('meas/volt/dc')}
          >
            DCV
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-2"
            onClick={this.props.onClick('meas/res')}
          >
            RES
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-2"
            onClick={this.props.onClick('meas/freq')}
          >
            FREQ
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-2"
            onClick={this.props.onClick('meas/per')}
          >
            PER
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-sm ml-5"
            onClick={this.props.onClear}
          >
            CLEAR
          </button>
        </div>
      </div>
    );
  }
}

export default Buttons;
