import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/users',isLoggedIn, profileCtrl.index)
router.get('/admin',isLoggedIn,profileCtrl.adminPass)
router.get('/adminList',isLoggedIn,profileCtrl.showAdminsList)
router.post('/adminList',isLoggedIn, profileCtrl.showAdmins)
router.post('/adminList/:id',isLoggedIn, profileCtrl.adminStatusChange)


export {
  router
}
