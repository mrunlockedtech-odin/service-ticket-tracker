import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'

function newTicket(req, res) {
  res.render('tickets/new', {
    title: 'Create Ticket'
  })
}


function index(req, res) {
  Ticket.find({})
    .then(tickets => {
      console.log(req.user)
      Profile.findById(req.user?.profile._id)
        .then(profile => {
          res.render('tickets/index', {
            tickets: tickets,
            title: 'All Tickets',
            profile: profile,
          })
        })

    })
}


function create(req, res) {
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
function show(req,res){
  Ticket.findById(req.params.id)
  .populate('owner')
  .populate({
    path: 'comments',
    model:'commentSchema',
    populate: {
      path: 'owner'
    }
  })
  .then(ticket => {
    Profile.findById(ticket.owner._id)
    .then(profile => {
      console.log(profile)
      res.render('tickets/show',{
        title: `Ticket ${ticket.ticketNo}`,
        ticket:ticket,
        profile:profile
      })
    })

  })
}

function addComment(req,res){
  console.log(req.body,req.params,req.user)
  Ticket.findById(req.params.id)

  .then(ticket => {
    req.body.owner = req.user.profile._id
    ticket.comments.push(req.body)
    ticket.save()
    .then(() => {
        res.redirect(`/tickets/${ticket._id}`)

    })
  })
}

export {
  newTicket as new,
  create,
  index,
  show,
  addComment,
}