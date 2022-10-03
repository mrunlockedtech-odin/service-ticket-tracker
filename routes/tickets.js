import { Router } from 'express'
import * as ticketsCtrl from '../controllers/tickets.js'
import { isLoggedIn } from '../middleware/middleware.js'
import { passDataToView } from '../middleware/middleware.js'

const router = Router()

router.get('/',isLoggedIn,ticketsCtrl.index)
router.get('/new',isLoggedIn, ticketsCtrl.new)
router.get('/:id/edit',isLoggedIn,ticketsCtrl.edit)
router.get('/:id',isLoggedIn, ticketsCtrl.show)
router.post('/',isLoggedIn,ticketsCtrl.create)
router.post('/:id',isLoggedIn,ticketsCtrl.addComment)
router.put('/:id',isLoggedIn,ticketsCtrl.update)



export {
  router
}
