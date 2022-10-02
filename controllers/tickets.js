import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'

function newTicket(req,res){
  res.render('tickets/new',{
    title: 'Create Ticket'
  })
}


function index(req,res){
  Ticket.find({})
  .then(tickets => {
    console.log(req.user)
    Profile.findById(req.user.profile._id)
    .then(profile => {
      res.render('tickets/index', {
        tickets:tickets,
        title: 'All Tickets',
        profile:profile,
      })
    })

  })
}


function create(req,res){
req.body.owner = req.user.profile._id
req.body.status = "Open"
Ticket.countDocuments({})
.then(count => {
  req.body.ticketNo = count
  Ticket.create(req.body)
  .then(ticket => {
    res.redirect('/tickets')
  })
})

}

export {
  newTicket as new,
  create,
  index
}