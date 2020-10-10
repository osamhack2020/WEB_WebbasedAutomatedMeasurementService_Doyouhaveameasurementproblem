const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>res.json({username:'bryan~~~'}));
router.get('/test', (req, res)=> res.json({username: 'API'}));

module.exports = router;