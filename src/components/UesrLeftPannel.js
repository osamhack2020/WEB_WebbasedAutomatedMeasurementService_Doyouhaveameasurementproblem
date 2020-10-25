import React, { Component } from 'react';
import '../css/LeftPannel.css';
import Display from './Display';

class LeftPannel extends Component {
    render() {
        return(
            <div
                id="LeftPannel"
                className="d-flex flex-column align-items-stretch border border-light rounded-lg p-5 bg-secondary"
            >
                상단에 있는 사용자와 작업을 선택한 뒤에 측정시작 버튼을 눌러주세요.
            </div>
        )
    }
}

export default LeftPannel;
