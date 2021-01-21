import UsersModel from '../models/UsersModel.js'

export default async (req, res, next) => {
    if (!req.session.user) {
        return next()
    }

    req.user = await UsersModel.findById(req.session.user._id)
    next()
}