import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})
router.get('/unsignedUser',function(req,res){
  res.render('unsignedUser', {
    title:'Please Sign In'
  })
})

export {
  router
}
