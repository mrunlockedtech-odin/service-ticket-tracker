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

function show(req,res){
  Org.findById(req.params.id)
  .then(org => {
    Profile.find({})
    .then(profiles => {
      Profile.findById(req.user.profile._id)
      .then(currentProfile => {
        res.render('orgs/show',{
          title: org.name,
          org:org,
          profiles:profiles,
          currentProfile:currentProfile,
        })
      })

    })

  })

}
function addUserOrg(req,res){
  console.log(req.body.user)
  Org.findById(req.params.id)
  .then(newOrg => {
    console.log(newOrg)
    Profile.findByIdAndUpdate(req.body.user,{org:newOrg},{new:true})
    .then(profile => {
      res.redirect(`/orgs/${req.params.id}`)
    })
  })


}


export {
  index,
  create,
  show,
  addUserOrg,
}