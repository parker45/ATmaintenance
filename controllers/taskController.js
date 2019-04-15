var Task = require('../models/Task')
var Trip = require('../models/Trip')

var async = require('async');

exports.admin = function(req, res) {
  async.parallel({
    inbox: function(callback) {
      Task.find({type:'Inbox'}, callback);
    },
    recurring: function(callback) {
      Task.find({type:'Recurring'}, callback);
    },
    tasks: function(callback) {
      Task.find({type:'Default'}, callback);
    },
    all: function(callback) {
      Task.find({
        $and: [
          {$or:[{type:'Default'}, {type:'Recurring'}]},
          { due_date: { $ne: null } }
        ]
      }, callback).sort( { due_date: 1, priority: -1 } );
      // Task.find({ due_date:null }, callback);
      // Task.find({ type:'Default' });
      // Task.find({ date: { $ne: null } }).sort({ date: -1 } });
    },
    all_null: function(callback) {
      Task.find({
        $and: [
          {$or:[{type:'Default'}, {type:'Recurring'}]},
          { due_date:null }
        ]
      }, callback).sort( { due_date: 1, priority: -1 } );
    },
    count: function(callback) {
      Task.countDocuments({}, callback);
    }
  }, function(err, results) {
    res.render('admin', { title: 'OCVT Manager | Admin', error: err, data: results });
  });
};

exports.new_task = function(req, res) {
  async.parallel({
    trips: function(callback) {
      Trip.find(callback)
    }
  }, function(err, results) {
    res.render('new_task', { title: 'OCVT Manager | New Task', error: err, trips:results.trips });
  });
};

exports.task_review_get = function(req, res, next) {
  async.parallel({
    task: function(callback) {
      Task.findById(req.params.id).exec(callback);
    },
    trips: function(callback) {
      Trip.find(callback)
    }
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.task==null) { // No results.
      var err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.render('review_task', { title: 'OCVT Manager | Review Task', task:results.task, trips:results.trips });
  });
};

exports.task_update_get = function(req, res, next) {
  async.parallel({
    task: function(callback) {
      Task.findById(req.params.id).exec(callback);
    },
    trips: function(callback) {
      Trip.find(callback)
    }
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.task==null) { // No results.
      var err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.render('admin_form', { title: 'OCVT Manager | Update Task', task:results.task, trips:results.trips });
  });
};

// Display list of all Tasks
exports.task_list = function(req, res) {
  async.parallel({
    task_list: function(callback) {
      Task.find({type:['Default','Recurring']}, callback);
    }
  }, function(err, results) {
    res.render('tasks', { title: 'OCVT Manager | Task', error: err, data: results });
  });
};

// Display detail page for a specific task.
exports.task_detail = function(req, res) {
  async.parallel({
    task: function(callback) {
      Task.findById(req.params.id).exec(callback);
    },
    trip: function(callback) {
      Trip.find(callback)
    }
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.task==null) { // No results.
      var err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.render('task_detail', { title: 'OCVT Manager | Task Details', task:results.task,
    trip:results.trip });
  });
  // res.render('task_detail', { title: 'Task Detail' });
  // res.send('NOT IMPLEMENTED: task detail: ' + req.params.id);
};

// Handle tasks create POST
exports.task_create_post = (req, res, next) => {
    console.log(req.body);
    if(req.body.image_urls){
        req.body.image_urls = new Array(req.body.image_urls)
    }
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        creation_date: new Date(),
        priority: req.body.priority,
        trip_id: req.body.trip_id,
        image_urls: req.body.image_urls,
        type: req.body.type,
        completed: req.body.completed,
        location: req.body.location
    });
    task.save(function(err){
        if (err) {return next(err); }
        res.redirect('/admin')
    });
}

//Handles task delete POST
exports.task_delete_post = function(req, res) {
  Task.findOneAndDelete(
    { "_id" : req.params.id }, function deleteTask(err) {
    if (err) { return next(err) }
    res.redirect('/admin')
  })
};

//Handles task update POST
exports.task_update_post = function(req, res) {
  var task = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
    creation_date: null,
    priority: req.body.priority,
    trip_id: req.body.trip_id,
    image_urls: null,
    type: req.body.type,
    completed: req.body.completed,
    location: req.body.location
  }
  Task.findByIdAndUpdate(req.params.id, task, {}, function(err,thetask){
    if(err) { return next(err);}
    //Successful redirect to admin page
    res.redirect('/admin');
  })
};

exports.task_review_post = function(req, res) {
  var task = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
    creation_date: null,
    priority: req.body.priority,
    trip_id: req.body.trip_id,
    image_urls: null,
    type: req.body.type,
    completed: req.body.completed,
    location: req.body.location
  }
  Task.findByIdAndUpdate(req.params.id, task, {}, function(err,thetask){
    if(err) { return next(err);}
    //Successful redirect to admin page
    res.redirect('/admin');
  })
};
