import pkg from 'mongoose'

const schema = new pkg.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExp: Date
})

export default pkg.model('Users', schema)