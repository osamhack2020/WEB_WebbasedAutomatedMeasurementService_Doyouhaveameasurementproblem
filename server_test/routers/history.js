const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

//전체 측정절차 출력
router.post('/getHistory', (req, res) => {
  const userId = req.body.userId;
  db.query('select * from history where userId = ?', [userId], (err, rows) => {
    if (!err) {
      console.log(rows);
      res.json(rows);
    } else {
      console.log(`query error : ${err}`);
      res.send(err);
    }
  });
});
router.post('/postHistory', (req, res) => {
  const selectedProcedure = req.body.selectedProcedure;
  const nowDate = req.body.nowDate;
  const result = req.body.result;
  const userId = req.body.userId;
  const adminName = req.body.adminName;
  const adminRegion = req.body.adminRegion;
  const adminRank = req.body.adminRank;
  db.query(
    'INSERT INTO history ( nowDate, selectedProcedure,result ,userId,adminName,adminRegion,adminRank) VALUES (?,?,?,?,?,?,?)',
    [
      nowDate,
      selectedProcedure,
      result,
      userId,
      adminName,
      adminRegion,
      adminRank,
    ],
    (err, rows) => {
      if (!err) {
        //console.log(rows);
        res.json(rows);
      } else {
        //console.log(`query error : ${err}`);
        res.send(err);
      }
    },
  );
});
module.exports = router;
