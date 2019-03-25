var Trip = require('../models/trip')

// Display list of all Trips
exports.trip_list = function(req, res) {
    res.send('NOT implemented')
};

// Display detail page for a specific trip.
exports.trip_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: trip detail: ' + req.params.id);
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

