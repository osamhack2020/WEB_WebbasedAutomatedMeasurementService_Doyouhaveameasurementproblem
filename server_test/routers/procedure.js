const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

//전체 측정절차 출력
router.get('/procedure/getProcedures', (req, res) => {
  db.query('select * from procedure', (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log('Query error : $(err)');
      res.send(err);
    }
  });
});
router.post('/procedure', (req, res) => {
  const num = req.body.num;
  console.log('in procedure router');
  db.query('SELECT * from procedure WHERE num = ? ', [num], (err, rows) => {
    if (err) {
      //console.log('db query err in user.js');
      console.log(err);
      res.json({ loginsuccess: false });
    } else {
      //console.log(rows);
      if (rows.length > 0) {
        const num = rows[0].num;
        const title = rows[0].title;
        const contents = rows[0].contents;
        const lowValue = rows[0].lowValue;
        const measureValue = rows[0].measureValue;
        const highValue  = rows[0].highValue;
        const result = rows[0].result;
        res.json({
          num: num,
          title: title,
          contents: contents,
          lowValue: lowValue,
          measureValue: measureValue,
          highValue: highValue,
          result: result,
        });
      } else {
        console.log("procedure failed")
        res.json({ success: false });
      }
    }
  });
});

module.exports = router;
