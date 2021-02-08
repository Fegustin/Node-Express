export default (req, res, next) => {
    res.locals.isAuth = req.isAuthenticated()
    res.locals.csrf = req.csrfToken
    next()
}