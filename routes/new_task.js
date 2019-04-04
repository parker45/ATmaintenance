var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

/* GET new task page. */
// router.get('/', function(req, res, next) {
//   res.render('new_task', { title: 'OCVT Manager | New Task' });
// });

router.get('/', task_controller.new_task);

module.exports = router;
