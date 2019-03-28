var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('admin_form', { title: 'OCVT Manager | Admin Form' });
// });

// router.get('/', task_controller.task_update_get);

module.exports = router;
