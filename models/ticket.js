import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  owner:{type: Schema.Types.ObjectId, ref: 'Profile'},
  content: String
}, {
  timestamps: true
})

const ticketSchema = new Schema({
  name: String,
  ticketNo: {
    type: Number,
    min: 0
  },
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  content: String,
  comments: [commentSchema],
  status: {
    type: String,
    enum: ['Open','Closed','Resolved','Cancelled']
  },
  technician: {type: Schema.Types.ObjectId, ref:"Profile"}
}, {
  timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export {
  Ticket
}