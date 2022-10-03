import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  tickets:[{type: Schema.Types.ObjectId,ref:'Tickets'}],
  role: String,
  org: {type: Schema.Types.ObjectId, ref:'Org'},
  title:String,
  email:String,
  phoneNo:String,
  isAdmin: {
    type: Boolean,
    default:false
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
