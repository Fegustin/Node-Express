import passport from 'passport'
import bcrypt from 'bcrypt'
import UsersModel from "../../models/UsersModel.js"
import strategy from 'passport-local'

const LocalPassword = strategy.Strategy

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    await UsersModel.findById(id)
        .then(user => {
            done(null, user)
        }).catch(err => done(err))
})

passport.use(new LocalPassword({usernameField: 'email'}, async (email, password, done) => {
    try {
        await UsersModel.findOne({email}, async (err, user) => {
            if (err) return done(err)
            if (!user) return done(null, false, {message: 'Неверный email'})
            if (!await bcrypt.compare(password, user.password)) return done(null, false, {message: 'Неверный пароль'})
            return done(null, user)
        })
    } catch (e) {
        console.log(e)
    }
}))