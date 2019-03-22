#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Task = require('./models/Task')
var Trip = require('./models/Trip')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tasks = []
// var trips = []


function taskCreate(title, description, due_date, creation_date, priority, trip_id, image_urls, type, completed, location, cb) {
  taskdetail = {title:title , description: description, creation_date: creation_date, priority: priority }
  if (due_date != false) taskdetail.due_date = due_date
  if (trip_id != false) taskdetail.trip_id = trip_id
  if (image_urls != false) taskdetail.image_urls = image_urls
  if (type != false) taskdetail.type = type
  if (completed != false) taskdetail.completed = completed
  if (location != false) taskdetail.location = location
  
  var task = new Task(taskdetail);
       
  task.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Task: ' + task);
    tasks.push(task)
    cb(null, task)
  }  );
}

function createTasks(cb) {
    async.series([
        function(callback) {
          taskCreate('Tree Blowdown', 'A tree fell', false, '2018-07-08','Low',false,false,false,false,false, callback);
        },
        function(callback) {
            taskCreate('Lorem Ipsum', 'fkladsjfla', false, '2018-07-08','Low',false,false,false,false,false, callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createTasks,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Tasks: '+tasks);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



