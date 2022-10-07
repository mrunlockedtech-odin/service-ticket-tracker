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
    .catch(err => {
      console.log(err)
      res.redirect('/')
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
  if (req.body.password === "CarlWeezerIsCool") {
    Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.isAdmin = true
        profile.save()
        res.redirect('/profiles/adminList')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
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
          .catch(err => {
            console.log(err)
            res.redirect('/')
          })
      } else {
        res.render('error')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
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
    .catch(err => {
      console.log(err)
      res.redirect('/')
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
                userProfile: userProfile,
                isSelf
              })
            })
            .catch(err => {
              console.log(err)
              res.redirect('/')
            })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function edit(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      res.render(`profiles/edit`, {
        title: `Edit ${profile.name}`,
        profile: profile
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function update(req, res) {
  console.log(req.body)
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.redirect(`/profiles/${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
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