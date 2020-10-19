const express = require('express');
const router = express.Router();
const db = requireA('../dbconnection');

//전체 측정절차 출력
router.get('/getProcedures', (req,res) => {
   db.query('select * from procedure', (err, rows) => {
        if(!err) {
         res.json(rows);
        } else {
        console.log('Query error : $(err)');
            res.send(err);
        }
    });
});
