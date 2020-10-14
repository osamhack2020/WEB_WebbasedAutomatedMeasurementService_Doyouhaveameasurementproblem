const express = require('express');
const GPIB = require('linux-gpib');
const router = express.Router();

router.get("/meas/volt/dc", (req, res) => {
    const gpib = GPIB(0);
    let DMM = gpib.connect({
        pad: 13, // 장비 주소이며, 장비 설정 또는 index.js 에서 설정 가능
        timeout: "T1s" // 실 장비 테스트 중 EBAO 오류 방지를 위해 최대한 짧게한 1초로 조정
    });
    DMM.write("*RST");
    // 장비 초기화 해주는 명령어
    DMM.write("*CLS");
    // 장비 메모리 클리어해주는 명령어
    DMM.query("MEAS:VOLT:DC?").then((response) => {
      // DC 
        console.log(response);
        res.send(response);
        return DMM.disconnect();
    }).catch((err) => {
        console.error(err.message);
    });
});

router.get("/meas/volt/ac", (req, res) => {
    const gpib = GPIB(0);
    let DMM = gpib.connect({
        pad: 13, 
        timeout: "T1s"
    });
    DMM.write("*RST");
    // 장비 초기화 해주는 명령어
    DMM.write("*CLS");
    // 장비 메모리 클리어해주는 명령어
    DMM.query("MEAS:VOLT:AC?").then((response) => {
      // DC 
        console.log(response);
        res.send(response);
        return DMM.disconnect();
    }).catch((err) => {
        console.error(err.message);
    });
});

router.get("/meas/res", (req, res) => {
    const gpib = GPIB(0);
    let DMM = gpib.connect({
        pad: 13, 
        timeout: "T1s"
    });
    DMM.write("*RST");
    // 장비 초기화 해주는 명령어
    DMM.write("*CLS");
    // 장비 메모리 클리어해주는 명령어
    DMM.query("MEAS:RES?").then((response) => {
      // DC 
        console.log(response);
        res.send(response);
        return DMM.disconnect();
    }).catch((err) => {
        console.error(err.message);
    });
});

router.get("/meas/freq", (req, res) => {
    const gpib = GPIB(0);
    let DMM = gpib.connect({
        pad: 13, 
        timeout: "T1s"
    });
    DMM.write("*RST");
    // 장비 초기화 해주는 명령어
    DMM.write("*CLS");
    // 장비 메모리 클리어해주는 명령어
    DMM.query("MEAS:FREQ?").then((response) => {
      // DC 
        console.log(response);
        res.send(response);
        return DMM.disconnect();
    }).catch((err) => {
        console.error(err.message);
    });
});

router.get("/meas/per", (req, res) => {
    const gpib = GPIB(0);
    let DMM = gpib.connect({
        pad: 13, 
        timeout: "T1s"
    });
    DMM.write("*RST");
    // 장비 초기화 해주는 명령어
    DMM.write("*CLS");
    // 장비 메모리 클리어해주는 명령어
    DMM.query("MEAS:PER?").then((response) => {
      // DC 
        console.log(response);
        res.send(response);
        return DMM.disconnect();
    }).catch((err) => {
        console.error(err.message);
    });
});

module.exports = router;
