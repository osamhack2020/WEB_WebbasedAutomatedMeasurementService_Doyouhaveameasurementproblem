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
router.post('/login', (req, res) => {
  const idusers = req.body.idusers;
  const password = req.body.password;
  db.query(
    'SELECT * from users WHERE idusers = ? AND password = ?',
    [idusers, password],
    (err, rows) => {
      if (err) {
        console.log('db query err in user.js');
        console.log(err);
        res.json({ loginsuccess: false });
      } else {
        console.log('db query login in user.js');
        //console.log(rows);
        if (rows.length > 0) {
          res.json({ loginsuccess: true });
        } else {
          res.json({ loginsuccess: false });
        }
      }
    },
  );
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
        console.log(err);
        res.json({ registersuccess: false });
      } else {
        console.log(rows);
        res.send({ registersuccess: true });
      }
    },
  );
});

module.exports = router;
