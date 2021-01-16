import Todo from '../models/Todo.js'

export const goToTodos = async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.status(200).render('index', {
        title: 'Todo list',
        isIndex: true,
        todos
    })
}

export const goToCreated = (req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    })
}

export const createdToRedirectTodos = async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
}

export const completeToRedirectTodos = async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
}