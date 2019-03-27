var express = require('express');
var router = express.Router();

/* GET tasks page. */
router.get('/', function(req, res, next) {
  res.render('task_detail', { title: 'Task Detail' });
});

module.exports = router;
