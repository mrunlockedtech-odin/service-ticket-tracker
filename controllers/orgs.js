import { Org } from '../models/org.js'
import { Profile } from '../models/profile.js'

function index(req,res) {
  Org.find({})
  .then(orgs => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      res.render('orgs/index', {
        title:'Orgs',
        orgs:orgs,
        profile:profile
      })
    })

  })
}

function create(req,res){
console.log(req.body)
Org.create(req.body)
.then(org => {
  res.redirect('/orgs')
})
}


export {
  index,
  create,
}