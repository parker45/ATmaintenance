var express = require('express');
var router = express.Router();

/* GET tasks page. */
router.get('/', function(req, res, next) {
  res.render('tasks', { title: 'Tasks' });
});

module.exports = router;
