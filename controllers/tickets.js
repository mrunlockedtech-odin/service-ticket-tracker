import { Ticket } from '../models/ticket.js'

function newTicket(req,res){
  res.render('tickets/new',{
    title: 'Create Ticket'
  })
}


function index(req,res){
  Ticket.find({})
  .then(tickets => {
    res.render('tickets/index', {
      tickets:tickets,
      title: 'All Tickets',
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