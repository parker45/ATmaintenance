var express = require('express');
var router = express.Router();

var task_controller = require('../controllers/taskController');
var trip_controller = require('../controllers/tripController');

// GET request lists all tasks
router.get('/tasks', task_controller.task_list);

// GET request for one task
router.get('/task/:id', task_controller.task_detail)

// POST create
router.post('/task/create', task_controller.task_create_post)

// POST update
router.post('/task/update', task_controller.task_update_post)

// POST delete
router.post('/task/delete', task_controller.task_delete_post)

// GET request lists all trips
router.get('/trips', trip_controller.trip_list);

// GET request for one task
router.get('/trip/:id', trip_controller.trip_detail)

// POST create
router.post('/trip/create', trip_controller.trip_create_post)

// POST update
router.post('/trip/update', trip_controller.trip_update_post)

// POST delete
router.post('/trip/delete', trip_controller.trip_delete_post)

module.exports = router