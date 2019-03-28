var Task = require('../models/task')

var async = require('async');

exports.admin = function(req, res) {   
    async.parallel({
        inbox: function(callback) {
            Task.find({type:'Inbox'}, callback);
        },
        recurring: function(callback) {
            Task.find({type:'Recurring'}, callback);
        },
        count: function(callback) {
            Task.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('admin', { title: 'OCVT Manager | Admin', error: err, data: results });
    });
};

exports.task_update_get = function(req, res, next) {
    async.parallel({
        task: function(callback) {
            Task.findById(req.params.id).exec(callback);
        }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.task==null) { // No results.
              var err = new Error('Task not found');
              err.status = 404;
              return next(err);
          }
          res.render('admin_form', { title: 'OCVT Manager | Form', task:results.task });
      });
};

// Display list of all Tasks
exports.task_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Task create GET');
};

// Display detail page for a specific task.
exports.task_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: task detail: ' + req.params.id);
};

// Handle tasks create POST
exports.task_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create POST');
};

//Handles task delete POST
exports.task_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete POST');
};

//Handles task update POST
exports.task_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update POST');
};

