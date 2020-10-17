const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

router.get('/test', (req, res) => {
  db.query('select * from users', (err, rows) => {
    if (!err) {
      //console.log(rows);
      res.json(rows);
    } else {
      console.log(`query error : ${err}`);
      // res.send(err);
      res.send(err);
    }
  });
});
module.exports = router;
