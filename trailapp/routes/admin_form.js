var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin_form', { title: 'OCVT Manager | Admin Form' });
});

module.exports = router;
