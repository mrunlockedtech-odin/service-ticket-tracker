import { Router } from 'express'
import * as ticketsCtrl from '../controllers/tickets.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/',ticketsCtrl.index)
router.get('/new',isLoggedIn, ticketsCtrl.new)
router.post('/',ticketsCtrl.create)


export {
  router
}
