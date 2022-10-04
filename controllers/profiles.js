import { Profile } from '../models/profile.js'
import { Ticket } from '../models/ticket.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render('profiles/index', {
        title: 'Users',
        profiles: profiles
      })
    })
}
function adminPass(req, res) {
  Profile.findById(req.user.profile._id)
    .then(profile => {
      if (profile.isAdmin) {
        res.redirect('/profiles/adminList')
      } else {
        res.render('profiles/admAuth', {
          title: 'Admin Password Entry',
          wrongPass: false,
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })

}

function showAdmins(req, res) {
  if (req.body.password === "CarlWeezer") {
    Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.isAdmin = true
        profile.save()
      })
    res.redirect('/profiles/adminList')
  } else {
    res.render('profiles/admAuth', {
      wrongPass: true,
      title: "Admin Password Entry"
    })
  }
}
function showAdminsList(req, res) {
  Profile.findById(req.user.profile._id)
    .then(profile => {
      if (profile.isAdmin) {
        Profile.find({})
          .then(profiles => {
            res.render('profiles/adminList', {
              title: 'Admins',
              profiles: profiles
            })
          })

      } else {
        res.render('error')
      }
    })
}

function adminStatusChange(req, res) {
  console.log(req.params)
  Profile.findById(req.params.id)
    .then(profile => {
      profile.isAdmin = !(profile.isAdmin)
      profile.save()
      res.redirect('/profiles/adminList')
    })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('org')
    .then(profile => {
      Ticket.find({ owner: req.params.id })
        .then(tickets => {
          Profile.findById(req.user.profile._id)
            .then(userProfile => {
              const isSelf = profile._id.equals(req.user.profile._id)
              res.render('profiles/show', {
                profile: profile,
                title: profile.name,
                tickets: tickets,
                userProfile:userProfile,
                isSelf
              })

            })

        })

    })
}

function edit(req,res){
  Profile.findById(req.params.id)
  .then(profile => {
    res.render(`profiles/edit`, {
      title: `Edit ${profile.name}`,
      profile:profile
    })
  })
}

function update(req,res){
  console.log(req.body)
  Profile.findByIdAndUpdate(req.params.id,req.body, {new:true})
  .then(()=> {
    res.redirect(`/profiles/${req.params.id}`)
  })
}

export {
  index,
  adminPass,
  showAdmins,
  showAdminsList,
  adminStatusChange,
  show,
  edit,
  update,
}