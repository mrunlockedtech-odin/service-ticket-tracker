function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleLoginURL = process.env.GOOGLE_LOGIN_URL
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/unsignedUser')
}

export {
  passDataToView,
  isLoggedIn,
}
