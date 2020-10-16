const express = require('express');
const router = express.Router();
// 전압AC,전압DC, 주파수, 주기, 저항 json 포맷이 결정되기 전 까지 사용하는 코드.
let voltages = [
  { value: '-9.99222490E+00' },
  { value: '1.99971690E+00' },
  { value: '8.12312360E-01' },
  { value: '7.99221290E+00' },
  { value: '6.12397190E+00' },
  { value: '1.99812360E-01' },
];

let currents = [
  { value: '2.99222490E+00' },
  { value: '3.99222490E+00' },
  { value: '-5.99222490E+00' },
  { value: '4.99222490E+00' },
  { value: '-2.99222490E+00' },
  { value: '7.99222490E+00' },
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
