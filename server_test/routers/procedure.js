const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

//전체 측정절차 출력
<<<<<<< HEAD
router.get('/procedure/getProcedures', (req,res) => {
   db.query('select * from procedure', (err, rows) => {
        if(!err) {
         res.json(rows);
        } else {
        console.log('Query error : $(err)');
            res.send(err);
        }
    });
=======
router.get('/getProcedures', (req, res) => {
  db.query('select * from procedure', (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log('Query error : $(err)');
      res.send(err);
    }
  });
>>>>>>> 93da773bcd41d3a2fad586ab7c21a482252a5177
});

module.exports = router;
