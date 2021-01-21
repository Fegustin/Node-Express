import pkg from 'mongoose'

const schema = new pkg.Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    }
})

// schema.methods.validatePassword = (password) => {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
//     return this.hash === hash
// }
//
// schema.methods.generateJWT = () => {
//     const today = new Date();
//     const expirationDate = new Date(today)
//     expirationDate.setDate(today.getDate() + 60)
//
//     return jwt.sign({
//         email: this.email,
//         id: this._id,
//         exp: parseInt(expirationDate.getTime() / 1000, 10),
//     }, 'secret')
// }
//
// schema.methods.toAuthJSON = () => {
//     return {
//         _id: this._id,
//         email: this.email,
//         token: this.generateJWT(),
//     }
// }

export default pkg.model('Users', schema)