var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TaskSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        description: {type: String, required: true, max: 500},
        due_date: {type: Date},
        creation_date: {type: Date, required: true},
        priority: {type: String, enum:['1', '2', '3', '4'], default: '1', required: true},
        trip_id: {type: String},
        trip_date: {type: String},
        image_urls:{type:[String]},
        type: {type: String, enum:['Inbox', 'Recurring', 'Default'], default: 'Default'},
        completed: {type: Boolean},
        location: {type: String}
    }
)

module.exports = mongoose.model('Task', TaskSchema)

