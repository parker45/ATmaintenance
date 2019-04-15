var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

/* GET tasks page. */
router.get('/', function(req, res, next) {
  res.render('task_detail', { title: 'Task Detail' });
});

// GET request for one task
// router.get('/task_detail/:id', task_controller.task_by_id)

module.exports = router;
