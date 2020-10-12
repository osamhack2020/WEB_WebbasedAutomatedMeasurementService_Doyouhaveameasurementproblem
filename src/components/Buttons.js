import React, { Component } from 'react';
import '../css/Buttons.css';
class Buttons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="Buttons" className="d-flex flex-column">
        <label className="d-flex text-white m-2" htmlFor="basic-url">
          사용자 지정 query
        </label>
        <div className="d-flex flex-row align-items-stretch input-group mb-3">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text" id="basic-addon3">
              https://express-rest-api-server.com/
            </span>
          </div>
          <input
            className="d-flex"
            type="text"
            placeholder="meas/volt/dc"
            id="basic-url"
          />
          <button type="submit" className="d-flex btn btn-light">
            Submit
          </button>
        </div>
        <div className="d-flex flex-row align-items-strech bg-secondary justify-content-center mt-1 pl-5 pr-5">
          <div
            className="d-flex btn-group btn-group-toggle m-auto"
            data-toggle="buttons"
          >
            <label className="btn btn-light active">
              <input type="radio" name="options" id="option1" /> 5S
            </label>
            <label className="btn btn-light">
              <input type="radio" name="options" id="option2" /> 3S
            </label>
            <label className="btn btn-light">
              <input type="radio" name="options" id="option3" /> 1S
            </label>
          </div>

          <button
            type="button"
            className="d-flex btn btn-light btn-lg ml-5"
            onClick={this.props.onClick('meas/volt/ac')}
          >
            ACV
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-lg ml-2"
            onClick={this.props.onClick('meas/curr/ac')}
          >
            DCV
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-lg ml-2"
            onClick={this.props.onClick('meas/res')}
          >
            RES
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-lg ml-2"
            onClick={this.props.onClick('meas/freq')}
          >
            FREQ
          </button>
          <button
            type="button"
            className="d-flex btn btn-light btn-lg ml-2"
            onClick={this.props.onClick('meas/per')}
          >
            PER
          </button>
        </div>
      </div>
    );
  }
}

export default Buttons;
