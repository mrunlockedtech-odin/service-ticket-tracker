import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


//GET Routes
router.get('/users',isLoggedIn, profileCtrl.index)
router.get('/admin',isLoggedIn,profileCtrl.adminPass)
router.get('/adminList',isLoggedIn,profileCtrl.showAdminsList)
router.get('/:id/edit',isLoggedIn,profileCtrl.edit)
router.get('/:id', isLoggedIn, profileCtrl.show)


// POST Routes
router.post('/adminList',isLoggedIn, profileCtrl.showAdmins)
router.post('/adminList/:id',isLoggedIn, profileCtrl.adminStatusChange)

router.put('/:id', isLoggedIn, profileCtrl.update)


export {
  router
}
