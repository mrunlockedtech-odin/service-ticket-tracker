import { Router } from 'express'
import * as orgsCtrl from '../controllers/orgs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/',isLoggedIn,orgsCtrl.index)

router.get('/:id',isLoggedIn, orgsCtrl.show)

router.post('/',isLoggedIn,orgsCtrl.create)
router.put('/:id',isLoggedIn,orgsCtrl.addUserOrg)


export {
  router
}
