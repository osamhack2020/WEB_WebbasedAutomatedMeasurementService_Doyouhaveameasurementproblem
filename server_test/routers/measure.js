const express = require('express');
const router = express.Router();
// 전압AC,전압DC, 주파수, 주기, 저항 json 포맷이 결정되기 전 까지 사용하는 코드.
let voltages = [
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 400 },
  { value: 500 },
  { value: 600 },
];

let currents = [
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
  { value: 60 },
  { value: 70 },
];
router.get('/volt/ac', (req, res) => {
  res.json(voltages[Math.floor(Math.random() * voltages.length)]);
});
router.get('/volt/dc', (req, res) => {
  res.json(voltages[Math.floor(Math.random() * voltages.length)]);
});
router.get('/curr/ac', (req, res) => {
  res.json(currents[Math.floor(Math.random() * currents.length)]);
});
router.get('/curr/dc', (req, res) => {
  res.json(currents[Math.floor(Math.random() * currents.length)]);
});

module.exports = router;
