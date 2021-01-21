import UsersModel from "../models/UsersModel.js"
import bcrypt from 'bcrypt';

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

export const authenticate = async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await UsersModel.findOne({email})

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) throw err
                    res.redirect('/')
                })
            } else res.redirect('/login')
        } else {
            res.redirect('/login')
        }
    } catch (e) {
        console.log(e)
    }
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
        }
    } catch (e) {
        console.log(e)
    }
}

