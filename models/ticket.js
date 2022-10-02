import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  name: String,
  ticketNo: {
    type: Number,
    min: 0
  },
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  content: String,
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
  status: String,
}, {
  timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export {
  Ticket
}