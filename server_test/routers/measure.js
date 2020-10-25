const express = require('express');
const router = express.Router();
// 전압AC,전압DC, 주파수, 주기, 저항 json 포맷이 결정되기 전 까지 사용하는 코드.
let voltages_ac = [
  { value: '1.09222490E+00' },
  { value: '2.09971690E+00' },
  { value: '3.12312360E+00' },
  { value: '4.09221290E+00' },
  { value: '5.02397190E+00' },
  { value: '2.99812360E-00' },
  { value: '5.99812360E-00' },
  { value: '6.09812360E-00' },
];
let voltages_dc = [
  { value: '1.09222490E+00' },
  { value: '2.09971690E+00' },
  { value: '3.12312360E+00' },
  { value: '4.09221290E+00' },
  { value: '5.02397190E+00' },
  { value: '2.99812360E-00' },
  { value: '5.99812360E-00' },
  { value: '6.09812360E-00' },
];

let resistance = [
  { value: '2.99222490E+00' },
  { value: '3.99222490E+00' },
  { value: '-5.99222490E+00' },
  { value: '4.99222490E+00' },
  { value: '-2.99222490E+00' },
  { value: '7.99222490E+00' },
];
let period = [
  { value: '2.99222490E+00' },
  { value: '3.99222490E+00' },
  { value: '-5.99222490E+00' },
  { value: '4.99222490E+00' },
  { value: '-2.99222490E+00' },
  { value: '7.99222490E+00' },
];
let frequency = [
  { value: '2.99222490E+00' },
  { value: '3.99222490E+00' },
  { value: '-5.99222490E+00' },
  { value: '4.99222490E+00' },
  { value: '-2.99222490E+00' },
  { value: '7.99222490E+00' },
];
router.get('/volt/ac', (req, res) => {
  res.json(voltages_ac[Math.floor(Math.random() * voltages_ac.length)]);
});
router.get('/volt/dc', (req, res) => {
  res.json(voltages_dc[Math.floor(Math.random() * voltages_dc.length)]);
});
router.get('/res', (req, res) => {
  res.json(resistance[Math.floor(Math.random() * resistance.length)]);
});
router.get('/freq', (req, res) => {
  res.json(frequency[Math.floor(Math.random() * frequency.length)]);
});
router.get('/per', (req, res) => {
  res.json(period[Math.floor(Math.random() * period.length)]);
});

module.exports = router;
