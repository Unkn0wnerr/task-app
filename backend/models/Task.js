const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Task = new Schema({
   title: {
      type: String
   },
   description: {
      type: String
   },
   date: {
      type: Date
   },
   priority: {
      type: Number
   }
}, {
   collection: 'tasks'
})

module.exports = mongoose.model('Task', Task)