import React, { Component } from 'react';
import RawData from '../components/RawData';
import '../css/LeftPannel.css';

// import Display from './Display';

class LeftPannel extends Component {
    render() {
        return(
            <div
                id="LeftPannel"
                className="d-flex flex-column align-items-stretch border border-black rounded-lg p-1"
            >
                <table className="table table-bordered text-center">
                    <thead>
                        <title>과거기록 Raw Data 현황</title>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">날짜</th>
                            <th scope="col">링크</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col">1</th>
                            <th scope="col">2020-10-17(ID: Admin_2)</th>
                            <th scope="col">
                                    <button 
                                        type="button" 
                                        className="btn btn-sm"
                                        data-toggle="modal"
                                        data-target="#rawdata"
                                    >링크
                                    </button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">2</th>
                            <th scope="col">2020-10-15(ID: Admin_2)</th>
                            <th scope="col">링크</th>
                        </tr>
                        <tr>
                            <th scope="col">3</th>
                            <th scope="col">2020-10-12(ID: Admin_3)</th>
                            <th scope="col">링크</th>
                        </tr>
                        <tr>
                            <th scope="col">4</th>
                            <th scope="col">2020-10-09(ID: Admin_1)</th>
                            <th scope="col">링크</th>
                        </tr>
                        <tr>
                            <th scope="col">5</th>
                            <th scope="col">2020-10-08(ID: Admin_2)</th>
                            <th scope="col">링크</th>
                        </tr>
                        <tr>
                            <th scope="col">6</th>
                            <th scope="col">2020-10-02ID: Admin_1)</th>
                            <th scope="col">링크</th>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default LeftPannel;
