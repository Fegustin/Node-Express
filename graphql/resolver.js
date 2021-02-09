import TodoModel from "../models/TodoModel.js";

const users = [
    {name: 'Oleg', age: 30, email: 'Oleg@mail.ru'},
    {name: 'Tut', age: 1, email: 'Tut@mail.com'}
]

export default {
    test() {
        return {
            count: Math.trunc(Math.random() * 10),
            users
        }
    },
    random({min, max, count}) {
        const arr = []
        for (let i = 0; i < count; i++) {
            const random = Math.random() * (max - min) + min
            arr.push(random)
        }
        return arr
    },
    addTestUser({user: {name, email}}) {
        const user = {
            name,
            age: Math.ceil(Math.random() * 30),
            email
        }
        users.push(user)
        return user
    },
    async getTodos() {
        try {
            return await TodoModel.find({})
        } catch (e) {
            throw  new Error('Fetch todos is noy available')
        }
    },
    async createTodo({todo: {title, completed}}) {
        try {
            const todo = new TodoModel({
                title,
                completed
            })
            await todo.save()
            return todo
        } catch (e) {
            throw new Error('Title is required')
        }
    }
}