import { Ticket } from '../models/ticket.js'
import { Profile } from '../models/profile.js'
import { Query } from 'mongoose'

function newTicket(req, res) {
  res.render('tickets/new', {
    title: 'Create Ticket'
  })
}


function index(req, res) {
  Ticket.find({})
    .then(tickets => {
      Profile.findById(req.user?.profile._id)
        .then(profile => {
          res.render('tickets/index', {
            tickets: tickets,
            title: 'All Tickets',
            profile: profile,
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


function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.status = "Open"
  Ticket.find().sort({ createdAt: -1 })
    .then(oldTickets => {
      if (oldTickets[0]) {
        req.body.ticketNo = oldTickets[0].incIndex
        req.body.incIndex = oldTickets[0].incIndex + 1
      }
      Ticket.create(req.body)
        .then(ticket => {
          res.redirect('/tickets')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
}

function deleteTicket(req, res) {
  Ticket.findByIdAndDelete(req.params.id)
    .then(deletedTicket => {
      Ticket.find().sort({ createdAt: -1 })
        .then(newestTickets => {
          Ticket.find({})
            .then(allTickets => {
              let indexArr = []
              allTickets.forEach(ticket => {
                indexArr.push(ticket.incIndex)
              })
              if (deletedTicket.incIndex > (Math.max(...indexArr))) {
                Ticket.updateOne({ ticketNo: newestTickets[0].ticketNo }, { $inc: { incIndex: 1 } })
                  .then(ticketTest => {
                    console.log(ticketTest)
                  })
              }
              res.redirect('/tickets')
            })
        })
    })
}
function show(req, res) {
  Ticket.findById(req.params.id)
    .populate('owner')
    .populate('technician')
    .populate({
      path: 'comments',
      model: 'commentSchema',
      populate: {
        path: 'owner'
      }
    })
    .then(ticket => {
      Profile.findById(ticket.owner._id)
        .then(profile => {
          Profile.findById(req.user.profile._id)
            .then(currentUser => {
              res.render('tickets/show', {
                title: `Ticket ${ticket.ticketNo}`,
                ticket: ticket,
                profile: profile,
                currentUser: currentUser
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

function addComment(req, res) {
  Ticket.findById(req.params.id)
    .then(ticket => {
      req.body.owner = req.user.profile._id
      ticket.comments.push(req.body)
      ticket.save()
        .then(() => {
          res.redirect(`/tickets/${ticket._id}`)
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
  Ticket.findById(req.params.id)
    .then(ticket => {
      Profile.find({ isAdmin: true })
        .then(admins => {
          res.render('tickets/edit', {
            ticket: ticket,
            title: `Edit ${ticket.ticketNo}`,
            admins: admins
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

function update(req, res) {
  Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(ticket => {
      res.redirect(`/tickets/${ticket._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function deleteComment(req, res) {
  Ticket.findById(req.params.ticketId)
    .then(ticket => {
      ticket.comments.remove({ _id: req.params.commentId })
      ticket.save()
      res.redirect(`/tickets/${req.params.ticketId}`)
    })
}

export {
  newTicket as new,
  create,
  index,
  show,
  addComment,
  edit,
  update,
  deleteComment,
  deleteTicket
}