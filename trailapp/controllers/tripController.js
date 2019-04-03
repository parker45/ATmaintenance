var Trip = require('../models/trip')

var async = require('async')

// Display list of all Trips
exports.trip_list = function(req, res) {
    res.send('NOT implemented')
};

// Display detail page for a specific trip.
exports.trip_detail = function(req, res) {
    console.log(req.params.id)
    async.parallel({
        trip: function(callback) {
            Trip.findById(req.params.id).exec(callback);
        }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.trip==null) { // No results.
              var err = new Error('Trip not found');
              err.status = 404;
              return next(err);
          }
          res.render('trip_detail', { title: 'Trip Info', trip:results.trip });
      });
    
};

// Handle trip create POST
exports.trip_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Trip create POST');
};

//Handles trip delete POST
exports.trip_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Trip delete POST');
};

exports.trip_update_get = function(req, res){
    async.parallel({
        trip: function(callback) {
            Trip.findById(req.params.id).exec(callback);
        }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.trip==null) { // No results.
              var err = new Error('Trip not found');
              err.status = 404;
              return next(err);
          }
          res.render('trip_edit', { title: 'Trip Edit', trip:results.trip });
      });
}
//Handles trip update POST
exports.trip_update_post = [
    
    // Convert the workers and volunteer hours to an array
    (req, res, next) => {
        console.log(req.body)
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
        next();
    },

    (req, res, next) => {
        console.log(req.body)
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
            //Successful redirect to trip detail page
            res.redirect('/database/trip/'+req.params.id);
        })
    }
];

