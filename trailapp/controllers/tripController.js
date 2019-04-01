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

//Handles trip update POST
exports.trip_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Trip update POST');
};

