import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  tickets:[{type: Schema.Types.ObjectId,ref:'Tickets'}],
  role: String,
  orgs: [{type: Schema.Types.ObjectId, ref:'Orgs'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
