var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TaskSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        description: {type: String, required: true, max: 500},
        due_date: {type: Date},
        creation_date: {type: Date, required: true},
        priority: {type: String, enum:['Low', 'Medium', 'Urgent', 'Emergency'], default: 'Low', required: true},
        trip_id: {type: Number},
        image_urls:[String],
        type: {type: String, enum:['Inbox', 'Recurring', 'Default'], default: 'Default'},
        completed: {type: Boolean},
        location: {type: String}
    }
)

module.exports = mongoose.model('Task', TaskSchema)

