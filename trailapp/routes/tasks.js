var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

/* GET tasks page. */
// router.get('/', function(req, res, next) {
//   res.render('tasks', { title: 'Tasks' });
// });

router.get('/', task_controller.task_list);

module.exports = router;
