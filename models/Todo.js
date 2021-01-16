import pkg from 'mongoose'

const schema = new pkg.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default pkg.model('Todo', schema)