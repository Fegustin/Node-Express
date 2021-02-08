import passport from 'passport'
import bcrypt from 'bcrypt'
import UsersModel from "../../models/UsersModel.js"
import strategyLocal from 'passport-local'
import strategyJWT from 'passport-jwt'
import keys from '../../keys/index.js'

const LocalPassword = strategyLocal.Strategy
const JWTPassport = strategyJWT.Strategy
const ExtractJWS = strategyJWT.ExtractJwt

const options = {
    jwtFromRequest: ExtractJWS.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt,
}

// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser(async (id, done) => {
//     await UsersModel.findById(id)
//         .then(user => {
//             done(null, user)
//         }).catch(err => done(err))
// })

// passport.use(new LocalPassword({usernameField: 'email'}, async (email, password, done) => {
//     try {
//         await UsersModel.findOne({email}, async (err, user) => {
//             if (err) return done(err)
//             if (!user) return done(null, false, {message: 'Неверный email'})
//             if (!await bcrypt.compare(password, user.password)) return done(null, false, {message: 'Неверный пароль'})
//             return done(null, user)
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }))

passport.use(new JWTPassport(options, async (jwtPayload, done) => {
    await UsersModel.findById(jwtPayload.userId, (err, user) => {
        if (err) return done(err)
        if (user) return done(null, user)
        else return done(null, false)
    })
}))