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
router.post('/userinfo', (req, res) => {
  const idusers = req.body.idusers;
  console.log('in userinfor router');
  db.query('SELECT * from users WHERE idusers = ? ', [idusers], (err, rows) => {
    if (err) {
      //console.log('db query err in user.js');
      console.log(err);
      res.json({ loginsuccess: false });
    } else {
      //console.log(rows);
      if (rows.length > 0) {
        const idusers = rows[0].idusers;
        const name = rows[0].name;
        const region = rows[0].region;
        const isAdmin = rows[0].isAdmin;
        const rank = rows[0].rank;
        res.json({
          idusers: idusers,
          success: true,
          name: name,
          region: region,
          isAdmin: isAdmin,
          rank: rank,
        });
      } else {
        console.log("userinfo failed")
        res.json({ success: false });
      }
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
        //console.log('db query err in user.js');
        console.log(err);
        res.json({ loginsuccess: false });
      } else {
        //console.log('db query login in user.js');
        //console.log(rows);
        if (rows.length > 0) {
          const idusers = rows[0].idusers;
          const name = rows[0].name;
          const region = rows[0].region;
          const isAdmin = rows[0].isAdmin;
          const rank = rows[0].rank;
          res.json({
            idusers: idusers,
            loginsuccess: true,
            name: name,
            region: region,
            isAdmin: isAdmin,
            rank: rank,
          });
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
