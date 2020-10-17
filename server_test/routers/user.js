const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
//전체 회원 출력
router.get('/getUsers', (req, res) => {
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

//회원가입 (post 방식)
router.post('/register', (req, res) => {
  const idusers = req.body.idusers;
  const password = req.body.password;
  const name = req.body.name;
  const region = req.body.region;
  const isAdmin = req.body.isAdmin;
  const rank = req.body.rank;
  console.log([idusers, password, name, region, isAdmin, rank]);
  db.query(
    'INSERT INTO users (idusers, password,name,region,isAdmin,rank)VALUES (?,?,?,?,?,?)',
    [idusers, password, name, region, isAdmin, rank],
    (err, rows) => {
      if (err) {
        //console.log(rows);
        res.json(rows);
      } else {
        res.send(rows);
      }
    },
  );
});

module.exports = router;
