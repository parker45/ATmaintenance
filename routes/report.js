var express = require('express');
var router = express.Router();

/* GET report page. */
router.get('/', function(req, res, next) {
  res.render('report1', { title: 'Public Reporting' });
});

router.get('/1', function(req, res, next) {
  res.render('report2', { title: 'Public Reporting' });
});

router.get('/submitted', function(req,res,next){
  res.render('public_report_submit', {title: 'Report Submitted'})
});

module.exports = router;