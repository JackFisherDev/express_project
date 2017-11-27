const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const userRouter = require('./user-router');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api/v1/user', userRouter);

module.exports = router;