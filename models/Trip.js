var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TripSchema = new Schema( 
    {
        date:{type:Date, required:true},
        creation_date:{type:Date},
        sections_covered: {type:String, required: true, max:100},
        attendees:{type:Number, required: true},
        leader:{type:String, required:true},
        workers:{type:[String], required:true},
        volunteer_hours:{type:[Number], required:true}, //total, trail, driving
        summary:{type:String},
        comments:{type:String},
        complete:{type:Boolean, default: false}
        
    }
)

module.exports = mongoose.model('Trip', TripSchema)