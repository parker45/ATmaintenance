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

