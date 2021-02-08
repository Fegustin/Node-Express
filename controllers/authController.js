import bcrypt from 'bcrypt'
import crypto from 'crypto'
import UsersModel from "../models/UsersModel.js"
import SendMail from "../utils/SendMail.js"
import keys from '../keys/index.js'
import passport from 'passport'

export const goToLogin = async (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true
    })
}

export const logout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

export const authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.redirect('/login')
        req.logIn(user, (err) => {
            if (err) return next(err)
            req.session.user = user
            req.session.save(err => {
                if (err) throw err
                res.redirect('/')
            })
        })
    })(req, res, next)
}

export const registration = async (req, res) => {
    try {
        const {email, name, password, repeat} = req.body

        const candidate = await UsersModel.findOne({email})
        if (candidate) {
            res.redirect('/login')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new UsersModel({email, name, password: hashPassword})
            await user.save()
            res.redirect('/')

            const sendMail = new SendMail(
                email,
                'Регистрация аккаунта',
                'Регистрация прошла успешна',
                '<p>Nice Dick bro</p>'
            )
            await sendMail.info()
        }
    } catch (e) {
        console.log(e)
    }
}

export const goToReset = (req, res) => {
    res.render('auth/reset', {
        title: 'Забыли пароль'
    })
}

export const resetPassword = (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buf) => {
            if (err) {
                console.log('Ошибка: ' + err)
                return res.redirect('/reset')
            }
            const token = buf.toString('hex')

            const candidate = await UsersModel.findOne({email: req.body.email})
            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                const sendMail = new SendMail(
                    candidate.email,
                    'Востановление аккаута',
                    'Востановление аккаута',
                    `<a href="${keys.baseURL}/password/${token}">Востановить доступ</a>`
                )
                await sendMail.info()
                res.redirect('/login')
            } else {
                console.log('Такого email нет')
                res.redirect('/reset')
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export const goToNewPassword = async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/login')
    }

    try {
        const user = await UsersModel.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (!user) {
            return res.redirect('/login')
        } else {
            res.render('auth/password', {
                title: 'Востановить пароль',
                userId: user._id.toString(),
                token: req.params.token
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export const newPassword = async (req, res) => {
    try {
        const user = await UsersModel.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = undefined
            user.resetTokenExp = undefined
            await user.save()
            res.redirect('/login')
        } else {
            res.redirect('/')
        }
    } catch (e) {
        console.log(e)
    }
}

