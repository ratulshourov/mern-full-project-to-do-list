const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('====================================');
    console.log('connected To db');
    console.log('====================================');
})
    .catch(console.error())
const Todo = require('./models/Todo');
app.get('/todos', async (req, res) => {
    const todoList = await Todo.find();
    res.json(todoList);
})

app.post('/entry', (req, res) => {
    console.log('asdsa')
    const todo = new Todo({
        text: req.body.text,
        complete:req.body.complete
    });
    todo.save();
    res.json(todo);
})
app.get('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    // todo.complete = !todo.complete;
    // todo.save();
    res.json(todo);
})
app.put('/update-todo/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

app.delete('/delete-todo/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    res.json(todo);
})
app.listen(3001, () => {
    console.log('====================================');
    console.log("Server Start Successfully");
    console.log('====================================');
})