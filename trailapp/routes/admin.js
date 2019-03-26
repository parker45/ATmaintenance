var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('admin', { title: 'OCVT Manager | Admin' });
// });

router.get('/', task_controller.admin);
router.get('/', task_controller.admin);

module.exports = router;
