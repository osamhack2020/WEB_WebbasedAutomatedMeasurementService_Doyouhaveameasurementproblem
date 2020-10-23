const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

//전체 측정절차 출력
router.post('/getProcedures', (req, res) => {
  db.query('select * from procedures', (err, rows) => {
    if (!err) {
      //console.log(rows);
      res.json(rows);
    } else {
      //console.log(`query error : ${err}`);
      res.send(err);
    }
  });
});
module.exports = router;
