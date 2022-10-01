import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orgSchema = new Schema({
  name: String,
}, {
  timestamps: true
})

const Org = mongoose.model('Org', orgSchema)

export {
  Org
}
