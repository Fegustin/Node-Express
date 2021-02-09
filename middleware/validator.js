import {check, validationResult} from 'express-validator'
import UsersModel from "../models/UsersModel.js";

export const validateUser = [
    check('email')
        .trim()
        .normalizeEmail()
        .bail()
        .custom(async (value, {req}) => {
            try {
                let user = await UsersModel.findOne({email: value})
                if (user) return Promise.reject('Такой email уже занят')
            } catch (e) {
                console.log(e)
            }
        })
        .isEmail()
        .withMessage('Некорректный Email')
        .bail(),
    check('name')
        .trim()
        .isLength({min: 3})
        .withMessage('Имя должно быть минимум 3 символа')
        .bail(),
    check('password')
        .trim()
        .isLength({min: 6, max: 56})
        .withMessage('Не менее 6 и не более 56 знаков')
        .bail()
        .isAlphanumeric()
        .withMessage('Только латинские буквы и цифры')
        .bail(),
    check('confirm')
        .trim()
        .custom((value, {req}) => {
            if (value !== req.body.password) throw new Error('Пароли не совпадают')
            return true
        })
        .bail(),
    ((req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()})
        next()
    })
]