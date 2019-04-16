var Trip = require('../models/Trip')
var Task = require('../models/Task')

var async = require('async')

// Display list of all Trips
exports.trip_list = function(req, res) {
    async.parallel({
        trips: function(callback){
            Trip.find(callback);
        }
    }, function(err, results){
        res.render('trips', {title: 'Trips', trips:results.trips})
    });
};

// Display detail page for a specific trip.
exports.trip_detail = function(req, res) {
    console.log(req.params.id)
    async.parallel({
        trip: function(callback) {
            Trip.findById(req.params.id).exec(callback);
        },
        tasks: function(callback){
            Task.find({trip_id: req.params.id}).exec(callback)
        }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.trip==null) { // No results.
              var err = new Error('Trip not found');
              err.status = 404;
              return next(err);
          }
          res.render('trip_detail', { title: 'Trip Info', trip:results.trip, tasks:results.tasks });
      });
    
};

exports.trip_create_get = function(req, res) {

    async.parallel({
        tasks: function(callback){
            Task.find({$and: [
                {type:{$ne: 'Inbox'}},
                { trip_id: null }
              ]}).exec(callback)
        }
      }, function(err, results) {
          if (err) { return next(err); }
          res.render('trip_create', {title:'New Trip', tasks:results.tasks});
      });

    
}

// Handle trip create POST
exports.trip_create_post = [
    //build the body correctly)
    (req,res,next) => {
        req.body.complete = false;
        req.body.workers=req.body.workers.split(',');
        req.body.total = new Array(req.body.total,req.body.trail,req.body.driving);
        req.body.creation_date = new Date();
        if(!(req.body.tasks instanceof Array)){
            req.body.tasks = new Array(req.body.tasks)
        }
        else {
            req.body.tasks = Object.values(req.body.tasks);
        }
        next();
    },

    (req, res, next) => {
        var criteria = {
            _id:{$in : req.body.tasks}
        };
        var trip = new Trip({
            date: req.body.date,
            creation_date: req.body.creation_date,
            sections_covered: req.body.sections_covered,
            attendees: req.body.attendees,
            leader: req.body.leader,
            workers: req.body.workers,
            volunteer_hours: req.body.total,
            summary: req.body.summary,
            comments: req.body.comments,
            complete: req.body.complete
        });
        trip.save(function(err, tripsaved){
            if (err) {return next(err);}
            console.log(tripsaved.id)
            Task.updateMany(criteria, {"$set":{"trip_id": tripsaved.id}}, function(err){
                if (err) {return next(err); }
                res.redirect('/database/trips');
            });
        });
        
    }
];

//Handles trip delete POST
exports.trip_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Trip delete POST');
};

exports.trip_update_get = function(req, res){
    async.parallel({
        trip: function(callback) {
            Trip.findById(req.params.id).exec(callback);
        },
        tasks: function(callback){
            Task.find({$or:
                    [
                        {$and: [{type:{$ne: 'Inbox'}},{ trip_id: null }]},
                        {trip_id: req.params.id}
                    ]
                }).exec(callback)
        }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.trip==null) { // No results.
              var err = new Error('Trip not found');
              err.status = 404;
              return next(err);
          }
          res.render('trip_edit', { title: 'Trip Edit', trip:results.trip, tasks:results.tasks });
      });
}
//Handles trip update POST
exports.trip_update_post = [
    
    // Convert the workers and volunteer hours to an array
    (req, res, next) => {
        // console.log(req.body)
        if(!(req.body.workers instanceof Array)){
            if(typeof req.body.workers==='undefined')
            req.body.workers=[];
            else
            req.body.workers=req.body.workers.split(',');
        }
        if(typeof req.body.total==='undefined'){
            req.body.total=[];
        }   
        else{
            req.body.total = new Array(req.body.total,req.body.trail,req.body.driving);
        }
        req.body.complete = (req.body.complete === 'on' ? true : false);
        req.body.attendees = req.body.workers.length + 1;
        if(!(req.body.tasks instanceof Array)){
            req.body.tasks = new Array(req.body.tasks)
        }
        else {
            req.body.tasks = Object.values(req.body.tasks);
        }
        
        next();
    },

    (req, res, next) => {
        // console.log(req.body)
        var criteriaUpdate = {
            _id:{$in : req.body.tasks}
        };
        var trip = {
            date: req.body.date,
            creation_date: null,
            sections_covered: req.body.sections_covered,
            attendees: req.body.attendees,
            leader: req.body.leader,
            workers: req.body.workers,
            volunteer_hours: req.body.total,
            summary: req.body.summary,
            comments: req.body.comments,
            complete: req.body.complete
        }
        Trip.findByIdAndUpdate(req.params.id, trip, {}, function(err,thetrip){
            if(err) { return next(err);}
            //This first finds the tasks that were originally associated with this trip
            async.parallel({
                tasks: function(callback){
                    Task.find({trip_id: req.params.id}).exec(callback)
                }
              }, function(err, results) {
                  if (err) { return next(err); }
                  //Then it compares the old vs the new and finds the difference
                  var old = []
                  results.tasks.forEach(element => {
                      old.push(element.id);
                  });
                  //This gets the difference of the two arrays
                  var diff = old.filter(x => !req.body.tasks.includes(x));
                  //Then we build a different search criteria 
                  //We do this to UN-select the tasks that may have been removed
                  var otherCriteria = {_id:{$in : diff}}
                  //The first query adds new tasks
                  Task.updateMany(criteriaUpdate, {"$set":{"trip_id": thetrip.id}}, function(err){
                    if (err) {return next(err); }
                    //The second query removes old tasks that were unselected
                    Task.updateMany(otherCriteria, {"$set":{"trip_id": null}}, function(err){
                        if (err) {return next(err); }
                        res.redirect('/database/trip/'+req.params.id);
                    });
                });
            });
               
        })
    }
];

