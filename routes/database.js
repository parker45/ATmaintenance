var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');
var trip_controller = require('../controllers/tripController');

// GET request lists all tasks
router.get('/tasks', task_controller.task_list);

// POST create
router.post('/task/create', task_controller.task_create_post)

// GET form to update single task
router.get('/task/:id/update', task_controller.task_update_get)

// POST update
router.post('/task/:id/update', task_controller.task_update_post)

// GET form to review single task
router.get('/task/:id/review', task_controller.task_review_get)

// POST form to review single task
router.post('/task/:id/review', task_controller.task_review_post)

// POST delete
router.post('/task/:id/delete', task_controller.task_delete_post)

// GET request for one task
router.get('/task/:id', task_controller.task_detail)

// GET request lists all trips
router.get('/trips', trip_controller.trip_list);

// POST create
router.post('/trip/create', trip_controller.trip_create_post)

// GET Update
router.get('/trip/:id/update', trip_controller.trip_update_get)

// POST update
router.post('/trip/:id/update', trip_controller.trip_update_post)

// POST delete
router.post('/trip/delete', trip_controller.trip_delete_post)

// GET request for one task
router.get('/trip/:id', trip_controller.trip_detail)

module.exports = router