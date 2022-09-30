import { Profile } from '../models/profile.js'

function index(req,res) {
  console.log("WOrking")
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title:'Users',
      profiles:profiles
    })
  })
}

export {
  index,
}