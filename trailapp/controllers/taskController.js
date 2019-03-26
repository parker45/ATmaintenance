var Task = require('../models/task')

// Display list of all Tasks
exports.task_list = function(req, res) {
    res.send('NOT implemented')
};

// Display detail page for a specific task.
exports.task_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: task detail: ' + req.params.id);
};

// Handle tasks create POST
exports.task_create_post = (req, res, next) => {
    var task = new Task( {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        creation_date: req.body.creation_date,
        priority: req.body.priority,
        trip_id: req.body.trip_id,
        image_urls: req.body.image_urls,
        type: req.body.type,
        completed: req.body.completed,
        location: req.body.location
    });
    task.save(function(err){
        if (err) {return next(err); }
        res.redirect(index);
    })
}

//Handles task delete POST
exports.task_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete POST');
};

//Handles task update POST
exports.task_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update POST');
};

